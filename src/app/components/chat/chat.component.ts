import { Component, Input, OnInit, Output,  EventEmitter, OnChanges, SimpleChanges,
          trigger, state, style, animate, transition, Renderer, ElementRef } from '@angular/core'

import { LocalStorageService } from 'angular-2-local-storage'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'

import { User } from '../../dtos/user'
import * as io from 'socket.io-client'
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



export class ChatComponent implements OnInit {
  
  @Input() closable = true
  @Input() visible: boolean
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  txt: string
  socket
  msgAll: string[] = []

  constructor(
    private localStorage: LocalStorageService,
    private renderer: Renderer,
    private elementRef: ElementRef
  ) { }

  ngOnInit() {
    this.socket = io.connect('http://localhost:3000')
    this.socket.on('message', (data) => {
      this.msgAll.push(data)
    })
  }


  sendMsg() {
    this.socket.emit('message', this.txt)
    this.txt = ''
  }


  close() {
    this.visible = false
    this.visibleChange.emit(this.visible)
  }
}