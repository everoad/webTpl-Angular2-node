import { Component } from '@angular/core'
import { Location } from '@angular/common'
import { User } from '../../user'

import { UserService } from '../../services/user.service'

@Component({
  moduleId: module.id + '',
  templateUrl: './login.component.html',
  styleUrls: ['../../../assets/css/pages/page_log_reg_v2.css']
})

export class LoginComponent {
  
  user: User = new User()
  message: string

  constructor(
    private userService: UserService,
    private location: Location
  ) { }

  submit(event) {
    this.userService.login(this.user)
      .then(json => {
        if(json.result === 'fail-email') {
          this.message = '존재하지 않는 이메일입니다.'
        } else if(json.result === 'fail-pwd') {
          this.message = '비밀번호가 틀렸습니다.'
        } else {
          this.location.go('/')
        }
      })
  }
}