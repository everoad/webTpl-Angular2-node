import { Component, OnInit } from '@angular/core'
import { AdminService } from '../../services/admin.service'

import { MenuFir } from '../../dtos/menuFir'
import { MenuSec } from '../../dtos/menuSec'


@Component({
  moduleId: module.id + '',
  templateUrl: './admin.menu.component.html'
})


export class AdminMenuComponent implements OnInit {


  menuFir: MenuFir[]


  constructor(
    private adminService: AdminService
  ) { }



  ngOnInit() {
    this.adminService.getMenuAll()
      .then(menuFir => this.menuFir = menuFir)
  }



  submit() {
    this.adminService.editMenu(this.menuFir)
      .then(json => json)
  }


}