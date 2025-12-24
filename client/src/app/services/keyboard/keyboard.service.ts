import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { LetterColor } from '../../enums/letter-color';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  constructor() {}

  maxWordLength = 5
  currentWord: string = ""
  submittedWords: Array<string> = []
  colorConstraints: Map<string, Array<LetterColor>> = new Map()

  handleLetterPress(letter: string) {
    if(this.currentWord.length < this.maxWordLength) {
      letter = letter.toUpperCase()
      this.currentWord += letter
    }
  }

  handleBackspacePress() {
    if(this.currentWord.length >= 1) {
      this.currentWord = this.currentWord.slice(0, -1)
    }
  }

  handleEnterPress() {
    if(this.submittedWords.includes(this.currentWord) || this.colorConstraints.has(this.currentWord)) {
      return
    }

    if(this.currentWord.length === this.maxWordLength) {
      this.submittedWords.push(this.currentWord)
      this.colorConstraints.set(this.currentWord, new Array(this.maxWordLength).fill(LetterColor.Gray))
      this.currentWord = ""
    }
  }

  resetBoard() {
    this.currentWord = ""
    this.submittedWords = []
    this.colorConstraints.clear()
  }

  updateColorConstraints(word: string, letterIndex: number, color: LetterColor) {
    let wordColorConstraints: LetterColor[] = this.colorConstraints.get(word) ?? []
    if(wordColorConstraints.length) {
      wordColorConstraints[letterIndex] = color
      this.colorConstraints.set(word, wordColorConstraints)
    }
  }

  getColorConstraintsOfWord(word: string): LetterColor[] {
    return this.colorConstraints.get(word) ?? [];
  }
}
