import { Component, OnInit } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'
import { BoardService } from '../../services/board.service'
import { Board } from '../../board'
import 'rxjs/add/operator/switchMap'


@Component({
  moduleId: module.id + '',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})


export class BoardComponent implements OnInit {

  boards: Board[] = []
  indexArr: number[] = []
  
  skey: string = ''
  stype: string = ''
  totalDataNum: number
  dataPerPage: number
  totalPage: number
  previous: number
  next: number
  index: number
  menu_fir_seq: string
  menu_sec_seq: string


  
  /**
   * Create a BoardComponent.
   * @param  {BoardService} privateboardService
   * @param  {ActivatedRoute} privateroute
   * @param  {Router} privaterouter
   */
  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pagination(1)
  }

  haha(index) {
    console.log(index)
  }


  
  /**
   * Pagination.
   * @param  {number} index
   * @returns void
   */
  pagination(index: number): void {
    this.index = index
    this.route.params.switchMap((p: Params) => {
      this.menu_fir_seq = p['menu_fir_seq']
      this.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.getList({
        menu_fir_seq: this.menu_fir_seq,
        menu_sec_seq: this.menu_sec_seq
      }, {
        index: index,
        stype: this.stype,
        skey: this.skey
      })
    }).subscribe(json => {
      this.boards = json['boards']
      this.totalDataNum = json['total']
      this.dataPerPage = json['dataPerPage']
      this.totalPage = json['totalPage']

  		var blockPerPage = 5
      var startBlock = Math.floor((this.index - 1) / blockPerPage) * blockPerPage + 1
      var endBlock = Math.floor((this.index - 1) / blockPerPage) * blockPerPage + blockPerPage
  		endBlock = (endBlock > this.totalPage) ? this.totalPage : endBlock
  		this.previous = (startBlock - blockPerPage < 0) ? startBlock : startBlock - blockPerPage
  		this.next = (startBlock + blockPerPage > this.totalPage) ? this.totalPage : startBlock + blockPerPage

      this.indexArr = []
      for (let i = startBlock; i <= endBlock; i++) {
        this.indexArr.push(i)
      }
    })
  }

}