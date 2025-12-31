import { Component } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { LetterColor } from '../../enums/letter-color';
import { SolverService } from '../../services/solver/solver.service';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  selectedColor = LetterColor.Gray

  constructor(readonly boardService: BoardService, private readonly solverService: SolverService) {}

  public get letterColor(): typeof LetterColor {
    return LetterColor; 
  }

  resetBoard() {
    this.boardService.resetBoard()
    this.solverService.updateSolverResult();
  }

  selectLetterColor(selectedColor: LetterColor) {
    this.selectedColor = selectedColor
  }

  updateColorConstraints(word: string, letterIndex: number, color: LetterColor) {
    this.boardService.updateColorConstraints(word, letterIndex, color);
    this.solverService.updateSolverResult();
  }

  getStyleColorOfLetter(word: string, letterIndex: number) {
    let colorConstraints: LetterColor[] = this.boardService.getColorConstraintsOfWord(word)
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
