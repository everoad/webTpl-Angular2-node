import { Component, OnInit } from '@angular/core'
import { AdminService } from '../../services/admin.service'
import { DragulaService } from 'ng2-dragula/ng2-dragula'

import { MenuFir } from '../../dtos/menuFir'
import { MenuSec } from '../../dtos/menuSec'


@Component({
  moduleId: module.id + '',
  templateUrl: './admin.menu.component.html',
  styleUrls: ['./admin.menu.component.css']
})


export class AdminMenuComponent implements OnInit {


  menuFir: MenuFir[] = []
  deleteFir: MenuFir[] = []
  deleteSec: MenuSec[] = []

  constructor(
    private adminService: AdminService,
    private dragulaService: DragulaService
  ) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1))
    })
  }



  ngOnInit() {
    this.adminService.getMenuAll()
      .subscribe(data => {
        if (data.result === 'success') {
          this.menuFir = data.menuFir
        } else {

        }
      })
  }

  private onDropModel(args) {
    let [el, target, source] = args
  }


  submit() {
    for (var i in this.menuFir) {
      var fir = this.menuFir[i]
      fir.menu_fir_index = i
      for (var j in fir.menu_sec) {
        fir.menu_sec[j].menu_sec_index = j
      }
    }

    this.adminService.editMenu(this.menuFir)
      .subscribe(data => {
        if (data.result === 'success') {
          alert('성공')
        } else {
          alert('실패') 
        }
      })
  }
}