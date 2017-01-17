import { Component, Input, OnInit, Output,  EventEmitter, OnChanges, SimpleChanges,
          trigger, state, style, animate, transition, Renderer } from '@angular/core'

import { LocalStorageService } from 'angular-2-local-storage'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { User } from '../../dtos/user'
import * as io from 'socket.io-client'
import { Observable } from 'rxjs/Observable'

declare var $: JQueryStatic


@Component({
  selector: 'chat-dialog',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.css' ],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100)
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'scale3d(.0, .0, .0)'}))
      ])
    ])
  ]
})



export class ChatComponent implements OnInit, OnChanges {
  

  @Input() closable
  @Input() visible: boolean = false
  @Output() visibleChange: EventEmitter<boolean>
  
  txt: string
  socket
  msgAll: string[]



  constructor(
    private ls: LocalStorageService,
    private renderer: Renderer

  ) {
    this.visibleChange = new EventEmitter<boolean>()
    this.closable = true
    this.msgAll = []
  }





  ngOnInit() {
    this.socket = io.connect('http://localhost:3000')
    this.socket.on('message', (data) => {
      this.msgAll.push(data)
    })
  }

  ngOnChanges(change: SimpleChanges) {
    if (typeof change['visible'].currentValue !== 'boolean'
        && typeof change['visible'].previousValue !== 'boolean') {
      return
    }
    if (change['visible'].currentValue !== change['visible'].previousValue) {
      setTimeout(() => {
        $('.dialog').draggable()
      })
    }
  }

  
  sendMsg() {
    this.socket.emit('message', (<User> this.ls.get('user')).user_nick + " :" + this.txt)
    this.txt = ''
  }



  close() {
    this.visibleChange.emit(false)
  }
}