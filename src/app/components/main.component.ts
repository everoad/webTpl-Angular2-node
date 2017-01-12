import { Component, OnInit } from '@angular/core'
import { IndexService } from '../services/index.service' 


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
    private indexService: IndexService
  ) { }

  ngOnInit() {
    this.indexService.getMainList()
      .then(json => {this.boards = json; })
  }

}