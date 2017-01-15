import { Component, OnInit } from '@angular/core'
import { AdminService } from '../../services/admin.service'

@Component({
  moduleId: module.id + '',
  templateUrl: './admin.home.component.html'
})


export class AdminHomeComponent implements OnInit {

  constructor(
    private adminService: AdminService
  ) { }

  ngOnInit() {
    
  }
}