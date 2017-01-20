import { Component, OnInit, ViewEncapsulation, Renderer } from '@angular/core'
import { ActivatedRoute, Params, Router } from '@angular/router'

import { BoardService } from '../../services/board.service'
import { Board } from '../../dtos/board'

import 'rxjs/add/operator/switchMap'


@Component({
  moduleId: module.id + '',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
  encapsulation: ViewEncapsulation.None
})


export class BoardComponent implements OnInit {

  boards: Board[]
  indexArr: number[]
  index: number

  previous: number
  next: number

  menu_fir_seq: string
  menu_sec_seq: string
  skeyElem 
  stypeElem

  /**
   * Create a BoardComponent.
   * @param  {BoardService} privateboardService
   * @param  {ActivatedRoute} privateroute
   * @param {Renderer} renderer
   * @param  {Router} privaterouter
   */
  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private renderer: Renderer,
    private router: Router
  ) { 
    this.boards = []
  }


  ngOnInit(): void {
    this.skeyElem = this.renderer.selectRootElement('#skey')
    this.stypeElem = document.getElementById('stype')

    this.route.queryParams.subscribe(p => {
      this.index = p['index']
      this.pagination(p['index'], p['stype'], p['skey'])
    })
  }

 
  /**
   * Pagination.
   * @param  {number} index
   * @returns void
   */
  navigating(index: number) {
    var queryParams = {
      index: index
    }
    let skeyVal = this.skeyElem.value
    let stypeVal = this.stypeElem.value

    if (skeyVal && stypeVal) {
      queryParams['skey'] = skeyVal
      queryParams['stype'] = stypeVal
    }

    this.router.navigate([ 'board',
                           this.menu_fir_seq,
                           this.menu_sec_seq ], 
                           { queryParams: queryParams })
  }



  /**
   * 
   * @param {number} index
   * @param {string} stype
   * @param {string} stkey
   */
  pagination(index: number, stype: string, skey: string): void {
    
    this.route.params.switchMap((p: Params) => {
      this.menu_fir_seq = p['menu_fir_seq']
      this.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.getAll({ menu_fir_seq: this.menu_fir_seq,
                                        menu_sec_seq: this.menu_sec_seq },
                                      { skey: skey,
                                        stype: stype,
                                        index: index })

    }).subscribe(json => {
      this.boards = json['boards']
      let totalDataNum = json['total']
      let dataPerPage = json['dataPerPage']
      let totalPage = json['totalPage']

  		var blockPerPage = 5
      var startBlock = Math.floor((index - 1) / blockPerPage) * blockPerPage + 1
      var endBlock = Math.floor((index - 1) / blockPerPage) * blockPerPage + blockPerPage
  		endBlock = (endBlock > totalPage) ? totalPage : endBlock

  		this.previous = (startBlock - blockPerPage < 0) ? startBlock : startBlock - blockPerPage
  		this.next = (startBlock + blockPerPage > totalPage) ? totalPage : startBlock + blockPerPage

      this.indexArr = []
      for (let i = startBlock; i <= endBlock; i++) {
        this.indexArr.push(i)
      }
    })
  }



}