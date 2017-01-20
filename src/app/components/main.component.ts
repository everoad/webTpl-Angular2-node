import { Component, OnInit } from '@angular/core'
import { IndexService } from '../services/index.service' 
import { EventService } from '../services/event.service'

import { LoginComponent } from './user/login.component'
 

 
@Component({
  moduleId: module.id + '',
  templateUrl: './main.component.html',
  styles: [
    'table { text-align: center; } ' + 
    `.menu { background: white; border: 1px solid #ddd; margin-top: 20px; margin-bottom: 10px; padding: 40px; }`
  ]
})



export class MainComponent implements OnInit {

  boards;

  constructor(
    private indexService: IndexService,
    private eventService: EventService
  ) { }


  ngOnInit() {
    this.indexService.getMainList()
      .subscribe(json => { 
        if (json.result === 'success') {
          this.boards = json.boards
        } else {
          alert('서버상 문제로 실패')
        }
      })
    
  }

}