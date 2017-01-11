import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { Board } from '../../board'
import { BoardService } from '../../services/board.service'

import 'rxjs/add/operator/switchMap'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BoardDetailComponent implements OnInit {
  
  board: Board = new Board()

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.switchMap((p: Params) => 
      this.boardService.getDetail({
        "board_seq": p['board_seq'],
        "menu_fir_seq": p['menu_fir_seq'],
        "menu_sec_seq": p['menu_sec_seq']
      })).subscribe(board => {
        this.board = board
        console.log(this.board)
      })
  }
}