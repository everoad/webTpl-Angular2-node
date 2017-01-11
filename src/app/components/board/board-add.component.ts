import { Component, OnInit } from '@angular/core'
import { BoardService } from '../../services/board.service'
import { IndexService } from '../../services/index.service'
import { Board } from '../../board'
import { ActivatedRoute, Router, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.css']
})

export class BoardAddComponent implements OnInit {
  
  board: Board = new Board()
  content: HTMLElement

  constructor(
    private boardService: BoardService,
    private indexService: IndexService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.content = document.getElementById('content')
  }

  submit($event) {
    this.board.content = this.content.innerHTML
    this.route.params.switchMap((p: Params) => {
      this.board.menu_fir_seq = p['menu_fir_seq']
      this.board.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.add(this.board)
     }).subscribe(json => console.log(json))
  }

  upload(event) {
    this.indexService.uploadImg(event.target.files[0])
      .then(json => {
        let elem = document.createElement('img')
        elem.setAttribute('src', 'api/img?img=' + json.uploadFileName)
        elem.setAttribute('alt', json.originalFileName)
        this.content.appendChild(elem)
      })
  }
}