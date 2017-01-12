import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { BoardService } from '../../services/board.service'
import { IndexService } from '../../services/index.service'
import { Board } from '../../board'
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
    private router: Router
  ) { }



  ngOnInit() {
    this.board = new Board()
    this.content = document.getElementById('content')
  }



 
  /**
   * Submit content.
   * @param {MouseEvent} event
   */
  submit(even: MouseEvent) {
    this.board.content = this.content.innerHTML
    this.route.params.switchMap((p: Params) => {
      this.board.menu_fir_seq = p['menu_fir_seq']
      this.board.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.add(this.board)
     }).subscribe(json => console.log(json))
  }



  /**
   * Upload a image.
   * @param {Event} event
   */
  upload(event) {
    var file: File = event.target.files[0]
    if (file['type'] !== 'image/jpeg') {
      alert('이미지 파일이 아닙니다.')
      return
    }
    this.indexService.uploadImg(file)
      .then(json => {
        let elem = document.createElement('img')
        elem.setAttribute('src', 'api/img?img=' + json.uploadFileName)
        elem.setAttribute('alt', json.originalFileName)
        this.content.appendChild(elem)
      })
  }
}