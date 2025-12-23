import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KeyboardService {
  constructor() {}

  maxWordLength = 5
  currentWord: string = ""
  submittedWords: Array<string> = []

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
    if(this.currentWord.length === this.maxWordLength) {
      this.submittedWords.push(this.currentWord)
      this.currentWord = ""
    }
  }

  resetBoard() {
    this.currentWord = ""
    this.submittedWords = []
  }
}
