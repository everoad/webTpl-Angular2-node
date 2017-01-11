import { Component, OnInit } from '@angular/core'

import { IndexService } from '../../../services/index.service'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: []
})

export class HeaderComponent implements OnInit {
  
  menu = [];
  
  constructor(
    private indexService: IndexService
  ) { }

  ngOnInit() {
    this.indexService.getMenu().then(menu => this.menu  = menu)
  }
}