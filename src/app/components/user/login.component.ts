import { Component, Input, OnInit, Output, OnChanges, EventEmitter,
          trigger, state, style, animate, transition } from '@angular/core'
import { Router } from '@angular/router'

import { User } from '../../user'

import { EventService } from '../../services/event.service'
import { UserService } from '../../services/user.service'
import { LocalStorageService } from 'angular-2-local-storage'


@Component({
  selector: 'login-dialog',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/pages/page_log_reg_v2.css', './dialog.component.css'],
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

export class LoginComponent implements OnInit {
  
  @Input() closable: boolean
  @Input() visible: boolean
  @Output() visibleChange: EventEmitter<boolean>

  user: User
  message: string
  
  constructor(
    private eventService: EventService,
    private userService: UserService,
    private ls: LocalStorageService,
    private router: Router
  ) { 
    this.visibleChange = this.eventService.visibleChange
    this.user = new User()
    this.message = ''
    this.closable = true
  }

  ngOnInit() {
    this.visibleChange.subscribe(visible => {
      this.visible = visible
    })
  }
  
  submit(event) {
    this.userService.login(this.user)
      .then(json => {

        if (json.result === 'success') {

          this.ls.set('user', json.user)

          if (this.ls.get('redirectUrl')) {
            let redirectUrl = this.ls.get('redirectUrl') + ''
            this.ls.remove('redirectUrl')
            this.router.navigateByUrl(redirectUrl)
          }

          this.close()

        } else {

          this.message = '다시 입력해주세요.'

        }
      })
  }

  close() {
    if (this.ls.get('redirectUrl')) {
      this.ls.remove('redirectUrl')
    }
    this.visible = false
    this.visibleChange.emit(this.visible)
  }
}