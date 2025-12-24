import { Component } from '@angular/core';
import { KeyboardService } from '../../services/keyboard/keyboard.service';
import { LetterColor } from '../../enums/letter-color';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  selectedColor = LetterColor.Gray

  constructor(readonly keyboardService: KeyboardService) {}

  public get letterColor(): typeof LetterColor {
    return LetterColor; 
  }

  resetBoard() {
    this.keyboardService.resetBoard()
  }

  selectLetterColor(selectedColor: LetterColor) {
    this.selectedColor = selectedColor
  }

  getStyleColorOfLetter(word: string, letterIndex: number) {
    let colorConstraints: LetterColor[] = this.keyboardService.getColorConstraintsOfWord(word)
    switch(colorConstraints[letterIndex]) {
      case LetterColor.Gray:
        return "gray-button"
      case LetterColor.Yellow:
        return "yellow-button"
      case LetterColor.Green:
        return "green-button"
      default:
        return ""
    }
  }
}
