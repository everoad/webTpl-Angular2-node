import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { BoardService } from '../../services/board.service'
import { IndexService } from '../../services/index.service'
import { Board } from '../../board'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-edit.component.html'
})


export class BoardEditComponent implements OnInit {


  board: Board
  content: HTMLElement


  constructor(
    private boardService: BoardService,
    private indexService: IndexService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.board = new Board()
  }



  ngOnInit() {
    this.content = document.getElementById('content')

    this.route.params.switchMap((p: Params) => {
      this.board.board_seq = p['board_seq']
      this.board.menu_fir_seq = p['menu_fir_seq']
      this.board.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.getOne(this.board)

    }).subscribe(board => this.board = board)
  }



  submit() {
    this.boardService.edit(this.board)
      .then(json => {
        if (json.result === 'success') {
          this.router.navigate([ 'board',
                                 this.board.menu_fir_seq,
                                 this.board.menu_sec_seq, 
                                 this.board.board_seq ])
        }
      })
  }

  upload(event) {
    var file: File = event.target.files[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/git' && file.type !== 'image/png') {
      return alert('이미지 파일이 아닙니다.')
    }
    
    this.indexService.uploadImg(file)
      .then(json => {
        let elem = document.createElement('img')
        elem.setAttribute('src', 'api/public/uploads/' + json.uploadFileName)
        elem.setAttribute('alt', json.originalFileName)
        this.content.appendChild(elem)
      })
  }
}