import { Component } from '@angular/core';
import { BoardService } from '../../services/board/board.service';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  standalone: false,
  templateUrl: './keyboard.component.html',
  styleUrl: './keyboard.component.scss'
})

export class KeyboardComponent {
  constructor(readonly boardService: BoardService) {}

  firstRowLetters = []
  letters: Array<Array<string>> = [
    ["Q","W","E","R","T","Y","U","I","O","P"],
    ["A","S","D","F","G","H","J","K","L"],
    ["Z","X","C","V","B","N","M"]
  ];
  
  @HostListener('document:keydown', ['$event'])
  handleKeyboardPress(event: KeyboardEvent) {
    if (event.key.match("^[a-zA-Z]$")) {
      this.boardService.handleLetterPress(event.key)
    } else if (event.key === 'Enter') {
      this.boardService.handleEnterPress()
    } else if (event.key === 'Backspace') {
      this.boardService.handleBackspacePress()
    }
  }
}
