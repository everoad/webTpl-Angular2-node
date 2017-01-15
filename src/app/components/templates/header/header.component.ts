import { Component, OnInit, ViewChild } from '@angular/core'

import { Router } from '@angular/router'

import { IndexService } from '../../../services/index.service'
import { UserService } from '../../../services/user.service'
import { LocalStorageService } from 'angular-2-local-storage'

import { User } from '../../../dtos/user'


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
      .then(menu => this.menu  = menu)
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