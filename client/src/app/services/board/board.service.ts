import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LetterColor } from '../../enums/letter-color';
import { WordListService } from '../word-list/word-list.service';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  constructor(private readonly wordListService: WordListService) {}

  private readonly _maxWordLength = 5
  private readonly _maxGuesses = 6
  private _currentWord: string = ""
  private _submittedWords: Array<string> = [] // TODO : check into removing this and only keeping the colorConstraints
  private _colorConstraints: Map<string, Array<LetterColor>> = new Map()
  private _errorMessage: string = ""

  get maxWordLength(): number {
    return this._maxWordLength;
  }

  get currentWord(): string {
    return this._currentWord;
  }

  get submittedWords(): string[] {
    return this._submittedWords;
  }

  get colorConstraints(): Map<string, Array<LetterColor>> {
    return this._colorConstraints;
  }

  get errorMessage(): string {
    return this._errorMessage;
  }

  handleLetterPress(letter: string) {
    if(this._currentWord.length < this._maxWordLength) {
      letter = letter.toUpperCase()
      this._currentWord += letter
    }
  }

  handleBackspacePress() {
    if(this._currentWord.length >= 1) {
      this._currentWord = this._currentWord.slice(0, -1)
    }
  }

  handleEnterPress() {
    if(this._currentWord.length !== this._maxWordLength) {
      return;
    }

    if(this._submittedWords.includes(this._currentWord) || this._colorConstraints.has(this._currentWord)) {
      this._errorMessage = "Word has already been guessed";
      return;
    }

    if(!this.wordListService.wordList.includes(this._currentWord.toLowerCase())) {
      this._errorMessage = "Not in word list"
      return;
    }

    this._submittedWords.push(this._currentWord)
    this._colorConstraints.set(this._currentWord, new Array(this._maxWordLength).fill(LetterColor.Gray))
    this._currentWord = ""
    this._errorMessage = ""
  }

  resetBoard() {
    this._currentWord = ""
    this._errorMessage = ""
    this._submittedWords = []
    this._colorConstraints.clear()
  }

  updateColorConstraints(word: string, letterIndex: number, color: LetterColor) {
    let wordColorConstraints: LetterColor[] = this._colorConstraints.get(word) ?? []
    if(wordColorConstraints.length) {
      wordColorConstraints[letterIndex] = color
      this._colorConstraints.set(word, wordColorConstraints)
    }
  }

  getColorConstraintsOfWord(word: string): LetterColor[] {
    return this._colorConstraints.get(word) ?? [];
  }

  guessesAreCompleted(): boolean {
    return this.submittedWords.length === this._maxGuesses;
  }
}
