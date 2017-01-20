import { Component, ViewEncapsulation, OnInit, Renderer } from '@angular/core'
import { BoardService } from '../../services/board.service'
import { IndexService } from '../../services/index.service'
import { Board } from '../../dtos/board'
import { ActivatedRoute, Router, Params } from '@angular/router'

import 'rxjs/add/operator/switchMap'

@Component({
  moduleId: module.id + '',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class BoardAddComponent implements OnInit {
  


  board: Board
  content: HTMLElement



  /**
   * @param  {BoardService} privateboardService
   * @param  {IndexService} privateindexService
   * @param  {ActivatedRoute} privateroute
   * @param  {Router} privaterouter
   */
  constructor(
    private boardService: BoardService,
    private indexService: IndexService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer
  ) { }
  



  ngOnInit() {
    this.board = new Board()
    this.content = this.renderer.selectRootElement('#content')
  }

 


  /**
   * Submit content.
   */
  submit() {
    this.board.content = this.content.innerHTML
    this.route.params.switchMap((p: Params) => {
      this.board.menu_fir_seq = p['menu_fir_seq']
      this.board.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.add(this.board)
     }).subscribe(json => {
       if (json.result === 'success') {
         this.router.navigate([ 'board',
                                this.board.menu_fir_seq,
                                this.board.menu_sec_seq,
                                json.board_seq ])
       } else {
         alert('서버상의 문제로 실패')
       }
     })
  }




  /**
   * Upload a image.
   * @param {Event} event
   */
  upload(event) {
    var file: File = event.target.files[0]
    if (file.type !== 'image/jpeg' && file.type !== 'image/gif' && file.type !== 'image/png') {
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