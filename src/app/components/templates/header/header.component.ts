import { Component, OnInit, EventEmitter, Input } from '@angular/core'

import { Router } from '@angular/router'

import { IndexService } from '../../../services/index.service'
import { UserService } from '../../../services/user.service'
import { LocalStorageService } from 'angular-2-local-storage'

import { User } from '../../../dtos/user'
import { Observable } from 'rxjs/Observable'


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})

export class HeaderComponent implements OnInit {
  
  menu = []

  constructor(
    private indexService: IndexService,
    private userService: UserService,
    private localStorage: LocalStorageService,
    private router: Router
  ) { }



  ngOnInit() {
    this.indexService.getMenu()
      .then(json => {
        if(json.result === 'success') {
          this.menu = json.menuFir
        } else {
          alert('서버상 문제')
        }
      })
  }



  logout() {
    this.localStorage.remove('user')
    this.userService.logout()
      .then(json => {
        if(json.result === 'success') {
          this.router.navigate([''])
        }
      })
  }

}