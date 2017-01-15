import { Component, Input, OnInit, Output, OnChanges, EventEmitter,
          trigger, state, style, animate, transition } from '@angular/core'

import { LocalStorageService } from 'angular-2-local-storage'

import { User } from '../../dtos/user'

import '/socket.io/socket.io.js'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: [ './chat.component.css' ]
})



export class ChatComponent implements OnInit {
  
  @Input() closable = true
  @Input() visible: boolean
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>()


  txtElem: HTMLElement


  constructor(
    private localStorage: LocalStorageService
  ) { }

  ngOnInit() {
    this.txtElem = document.getElementById('txt')
  }

  sendMsg() {
    
  }


}