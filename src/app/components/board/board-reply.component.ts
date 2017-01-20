import { Component, OnInit, Input, Renderer } from '@angular/core'

import { BoardService } from '../../services/board.service'
import { LocalStorageService } from 'angular-2-local-storage'

import { Reply } from '../../dtos/reply'
import { User } from '../../dtos/user'



@Component({
  selector: 'board-reply',
  templateUrl: './board-reply.component.html',
  styles: [
    'p { text-align: center }'
  ]
})



export class BoardReplyComponent implements OnInit {
  

  @Input() boardSeq: string
  
  replyAll: Reply[]
  replyOne: Reply


  constructor(
    private boardService: BoardService,
    private ls: LocalStorageService,
    private renderer: Renderer
  ) { }

  


  
  ngOnInit(): void {
    this.replyAll = []
    this.replyOne = new Reply()
    this.boardService.getReplyAll(this.boardSeq)
      .subscribe(json => {
        if (json.result === 'success') {
          this.replyAll = json.replyAll
        } else {
          alert('서버상 문제로 실패')
        }
      })
  }





  add(): void {
    this.replyOne.board_seq = this.boardSeq
    this.boardService.addReply(this.replyOne)
      .subscribe(json => {
        this.replyAll = json
        this.renderer.selectRootElement('textarea').value = ''
      })
  }





  delete(one: Reply) {
    this.boardService.deleteReply(one)
      .subscribe(json => {
        if (json.result === 'success') {
          this.replyAll.splice(this.replyAll.indexOf(one), 1)
        }
      })
  }


}