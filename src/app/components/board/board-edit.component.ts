import { Component, OnInit, Renderer, ViewEncapsulation } from '@angular/core'
import { Router, ActivatedRoute, Params } from '@angular/router'
import { BoardService } from '../../services/board.service'
import { IndexService } from '../../services/index.service'
import { Board } from '../../dtos/board'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-add.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class BoardEditComponent implements OnInit {


  board: Board
  content: HTMLElement


  constructor(
    private boardService: BoardService,
    private indexService: IndexService,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private router: Router
  ) { }



  ngOnInit() {
    this.content = this.renderer.selectRootElement('#content')
    this.board = new Board()
    
    this.route.params.switchMap((p: Params) => {
      this.board.board_seq = p['board_seq']
      this.board.menu_fir_seq = p['menu_fir_seq']
      this.board.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.getOne(this.board)

    }).subscribe(board => this.board = board)
  }



  submit() {
    this.board.content = this.content.innerHTML
    this.boardService.edit(this.board)
      .subscribe(json => {
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
      .subscribe(json => {
        let elem = this.renderer.createElement(this.content, 'img')
        this.renderer.setElementAttribute(elem, 'src', 'api/public/uploads/' + json.uploadFileName)
        this.renderer.setElementAttribute(elem, 'alt', json.originalFileName)
      })
  }
}