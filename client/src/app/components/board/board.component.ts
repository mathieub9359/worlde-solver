import { Component } from '@angular/core';
import { KeyboardService } from '../../services/keyboard/keyboard.service';

@Component({
  selector: 'app-board',
  standalone: false,
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})

export class BoardComponent {
  constructor(readonly keyboardService: KeyboardService) {}

  resetBoard() {
    this.keyboardService.resetBoard()
  }
}
