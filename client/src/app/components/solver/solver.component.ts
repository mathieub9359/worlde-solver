import { Component, OnInit } from '@angular/core';
import { SolverService } from '../../services/solver/solver.service';
import { WordListService } from '../../services/word-list/word-list.service';

@Component({
  selector: 'app-solver',
  standalone: false,
  templateUrl: './solver.component.html',
  styleUrl: './solver.component.scss'
})
export class SolverComponent implements OnInit {
  constructor(readonly solverService: SolverService, private readonly wordListService: WordListService) {}

  async ngOnInit(): Promise<void> {
    await this.wordListService.importWordListFromFile();
    this.solverService.updateSolverResult();
  }
}
