import { Injectable } from '@angular/core';
import { BoardService } from '../board/board.service';
import { WordListService } from '../word-list/word-list.service';
import { LetterColor } from '../../enums/letter-color';
import { GuessEntropy } from '../../interfaces/guess-entropy';
import { GuessEntropyTopK } from '../../classes/top-k';

@Injectable({
  providedIn: 'root'
})

export class SolverService {
  private _possibleAnswers: string[] = []
  private _bestGuessWords: string[] = []
  private readonly nBestGuesses: number = 10;

  constructor(private readonly boardService: BoardService, private readonly wordListService: WordListService) {}

  get possibleAnswers(): string[] {
    return this._possibleAnswers;
  }

  get bestGuessWords(): string[] {
    return this._bestGuessWords
  }

  updateSolverResult(): void {
    this.updatePossibleAnswers();
    // this.updateBestGuessWords();
  }

  private updatePossibleAnswers(): void {
    const possibleAnswers: string[] = [];

    for(const currWord of this.wordListService.wordList) {
      if(this.isPossibleWord(currWord)) {
        possibleAnswers.push(currWord);
      }
    }

    this._possibleAnswers = possibleAnswers;
  }

  // TODO : fix behavior where when there is very few words left, the best guesses are really bad
  private async updateBestGuessWords(): Promise<void> {
    if(this.possibleAnswers.length === 0) {
      this._bestGuessWords = [];
    }

    const guessEntropyTopK = new GuessEntropyTopK(this.nBestGuesses);
    for(const currWord of this.wordListService.wordList) {
      let guessEntropy: GuessEntropy = {word: currWord, entropy: this.getGuessEntropy(currWord)};
      guessEntropyTopK.add(guessEntropy);
    }

    this._bestGuessWords = guessEntropyTopK.getTopK().map((guessEntropy) => guessEntropy.word);
  }

  private isPossibleWord(wordToValidate: string): boolean {
    for(const [currWord, currConstraint] of this.boardService.colorConstraints) {        
        const constraintWithWordToValidate: LetterColor[] = this.getColorConstraintOfWordWithSolution(currWord, wordToValidate);

        // TODO : implement faster checking with bitmaps maybe?
        if(!this.colorConstraintsAreEqual(constraintWithWordToValidate, currConstraint)) {
          return false;
        }
    }

    return true;
  }

  // TODO : implement iterative checking (prevents calcualting whole constraint for no reason)
  private getColorConstraintOfWordWithSolution(guessWord: string, solutionWord: string): LetterColor[] {
    guessWord = guessWord.toLowerCase();
    solutionWord = solutionWord.toLowerCase();

    const constraint: LetterColor[] = [];
    const solutionLetterCount: Map<string, number> = new Map();
    
    for(const letter of solutionWord) {
      solutionLetterCount.set(letter, (solutionLetterCount.get(letter) ?? 0) + 1)
    }

    for(let i: number = 0; i < guessWord.length; i++) {
      const currGuessChar = guessWord[i];
      const currSolutionChar = solutionWord[i];

      if(!solutionLetterCount.has(currGuessChar) || solutionLetterCount.get(currGuessChar) === 0) {
        constraint[i] = LetterColor.Gray;
      } else if(currGuessChar === currSolutionChar) {
        constraint[i] = LetterColor.Green;
        solutionLetterCount.set(currGuessChar, solutionLetterCount.get(currGuessChar)! - 1)
      } else {
        constraint[i] = LetterColor.Yellow;
        solutionLetterCount.set(currGuessChar, solutionLetterCount.get(currGuessChar)! - 1)
      }
    }
    
    return constraint;
  }

  private colorConstraintsAreEqual(firstConstraints: LetterColor[], secondConstraints: LetterColor[]): boolean {
    if(firstConstraints.length !== secondConstraints.length) {
      return false;
    }

    for(let i: number = 0; i < firstConstraints.length; i++) {
      if(firstConstraints[i] !== secondConstraints[i]) {
        return false;
      }
    }

    return true;
  }

  private getGuessEntropy(guessWord: string) {
    const constraintCount = new Map<number, number>();

    for(const possibleAnswer of this.possibleAnswers) {
      const hashableColorConstraint = this.getHashableColorConstraint(this.getColorConstraintOfWordWithSolution(guessWord, possibleAnswer));
      constraintCount.set(hashableColorConstraint, (constraintCount.get(hashableColorConstraint) ?? 0) + 1);
    }

    let sumEntropy = 0;
    for(const currCount of constraintCount.values()) {
      const constraintProbability = currCount / this.possibleAnswers.length;
      sumEntropy += constraintProbability * Math.log2(constraintProbability)
    }

    return -1 * sumEntropy;
  }

  private getHashableColorConstraint(constraint: LetterColor[]) {
    let hash = 0;
    for (let i = 0; i < constraint.length; i++) {
      hash = hash * 3 + constraint[i];
    }
    return hash;
  }
}
