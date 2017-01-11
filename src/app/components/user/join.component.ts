import { Component } from '@angular/core'

import { UserService } from '../../services/user.service'

import { User } from '../../user'

@Component({
  moduleId: module.id + '',
  templateUrl: './join.component.html',
   styleUrls: ['../../../assets/css/pages/page_log_reg_v2.css']
})

export class JoinComponent {
  
  user: User = new User()

  constructor(
    private userService: UserService
  ) { }

  submit(event) {
    this.userService.join(this.user)
      .then(json => console.log(json))
  }
}