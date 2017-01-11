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
  
  totalDataNum: number
  dataPerPage: number
  totalPage: number
  previous: number
  next: number
  index: number
  menu_fir_seq: string
  menu_sec_seq: string

  constructor(
    private boardService: BoardService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.pagination(1)
  }

  pagination(index): void {
    this.index = index
    this.route.params.switchMap((p: Params) => {
      this.menu_fir_seq = p['menu_fir_seq']
      this.menu_sec_seq = p['menu_sec_seq']
      return this.boardService.getList({
        "index": this.index,
        "menu_fir_seq": this.menu_fir_seq,
        "menu_sec_seq": this.menu_sec_seq
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