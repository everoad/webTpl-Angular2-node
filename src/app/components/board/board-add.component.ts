import { Component } from '@angular/core'
import { BoardService } from '../../services/board.service'
import { Board } from '../../board'
import { ActivatedRoute, Router, Params } from '@angular/router'
import 'rxjs/add/operator/switchMap'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-add.component.html'
})

export class BoardAddComponent {
  
  board: Board;

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  add() {
    this.route.params.switchMap((p: Params) => {
      this.board.menu_fir_seq = p['board_fir_seq']
      this.board.menu_sec_seq = p['board_sec_seq']
      return this.boardService.add(this.board)
     }).subscribe(json => json)
  }

}