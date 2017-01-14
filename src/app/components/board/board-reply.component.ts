import { Component, OnInit, Input } from '@angular/core'

import { BoardService } from '../../services/board.service'
import { LocalStorageService } from 'angular-2-local-storage'

import { Reply } from '../../reply'

@Component({
  selector: 'board-reply',
  templateUrl: './board-reply.component.html'
})

export class BoardReplyComponent implements OnInit {
  


  @Input() boardSeq: string
  
  replyAll: Reply[]
  replyOne: Reply



  constructor(
    private boardService: BoardService,
    private ls: LocalStorageService
  ) { }

  


  
  ngOnInit(): void {
    this.replyAll = []
    this.replyOne = new Reply()

    this.boardService.getReplyAll(this.boardSeq)
      .then(json => this.replyAll = json)
  }





  add(): void {
    this.boardService.addReply(this.replyOne)
      .then(json => {
        if (json.result === 'success') {
          this.replyAll.push(this.replyOne)
          this.replyOne.content = ''
        }
      })
  }





  delete(one: Reply) {
    this.boardService.deleteReply(one)
      .then(json => {
        if (json.result === 'success') {
          this.replyAll.splice(this.replyAll.indexOf(one), 1)
        }
      })
  }


}