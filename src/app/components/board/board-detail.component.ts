import { Component, OnInit } from '@angular/core'

import { ActivatedRoute, Params, Router } from '@angular/router'
import { Board } from '../../board'
import 'rxjs/add/operator/switchMap'

import { BoardService } from '../../services/board.service'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css']
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