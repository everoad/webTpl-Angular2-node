import { Component, OnInit, ViewEncapsulation } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { EventService } from '../../services/event.service'
import { BoardService } from '../../services/board.service'
import { LocalStorageService } from 'angular-2-local-storage'

import { User } from '../../dtos/user'
import { Board } from '../../dtos/board'

import 'rxjs/add/operator/switchMap'




@Component({
  moduleId: module.id + '',
  templateUrl: './board-detail.component.html',
  styleUrls: ['./board-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})



export class BoardDetailComponent implements OnInit {
  

  board: Board
  index: number


  /**
   * @param  {BoardService} privateboardService
   * @param  {ActivatedRoute} privateroute
   * @param  {Router} privaterouter
   */
  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private ls : LocalStorageService,
    private eventService: EventService,
    private router: Router
  ) { }




  ngOnInit(): void {
    this.board = new Board()
    this.route.queryParams.subscribe((p: Params) => {
      this.index = p['index']
    })

    this.route.params.switchMap((p: Params) => {

      this.board.board_seq = p['board_seq']
      this.board.menu_fir_seq = p['menu_fir_seq']
      this.board.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.getOne(this.board)

    }).subscribe(board => this.board = board)
  }




  edit(): void {
    
    this.ls.set('board_user_email', this.board.user_email)
    this.router.navigate([ 'board',
                           this.board.menu_fir_seq,
                           this.board.menu_sec_seq, 
                           this.board.board_seq,
                           'edit' ])
  
  }




  delete(): void {

    if ((<User> this.ls.get('user')).user_email !== this.board.user_email) {
      return alert('deny')
    }

    this.boardService.delete(this.board)
      .then(json => {
        if (json.result === 'success') {
          this.index = (this.index) ? this.index : 1
          this.router.navigate([ 'board', 
                                  this.board.menu_fir_seq, 
                                  this.board.menu_sec_seq ], { queryParams: { index: this.index } } )
        }
      })
  }
}