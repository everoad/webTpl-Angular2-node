import { Component, Input, OnInit, Output, OnChanges, EventEmitter,
          trigger, state, style, animate, transition } from '@angular/core'

import { UserService } from '../../services/user.service'
import { LocalStorageService } from 'angular-2-local-storage'

import { User } from '../../dtos/user'

@Component({
  selector: 'join-dialog',
  templateUrl: './join.component.html',
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

export class JoinComponent {
  
  @Input() closable = true
  @Input() visible: boolean
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>()

  user: User = new User()


  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService
  ) { }

  submit(event) {
    this.userService.join(this.user)
      .then(json => {
        if(json.result === 'success') {
          this.localStorage.set('user', json.user)
          this.close()
        } else {
          alert('fail')
        }
      })
  }

   close() {
    this.visible = false
    this.visibleChange.emit(this.visible)
  }

}