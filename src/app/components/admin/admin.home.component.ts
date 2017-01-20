import { Component, OnInit } from '@angular/core'
import { AdminService } from '../../services/admin.service'
import { DragulaService } from 'ng2-dragula/ng2-dragula'

@Component({
  moduleId: module.id + '',
  templateUrl: './admin.home.component.html'
})


export class AdminHomeComponent implements OnInit {

  constructor(
    private adminService: AdminService
 //   private dragulaService: DragulaService
  ) { 
    // dragulaService.setOptions('third-bag', {
    //   removeOnSpill: true
    // });
  }

  ngOnInit() {
    
  }
}