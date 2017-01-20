import { Injectable }      from '@angular/core'
import { Http, Headers, Response }   from '@angular/http'
import {Observable}              from 'rxjs/Observable';

import { Reply } from '../dtos/reply'
import { Board } from '../dtos/board'

import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'  // debug
import 'rxjs/add/operator/catch'


@Injectable()
export class BoardService {
  
  
  constructor(
    private http: Http
  ) { }

  private _serverError(err: any) {
    console.log('server error:', err)
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error')
    }
    return Observable.throw(err || 'backend server error')
  }
 
  

  getAll(data, query) {
    return this.http.get(`/api/board/${data.menu_fir_seq}/${data.menu_sec_seq}?data=${JSON.stringify(query)}`)
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }




  getOne(board: Board) {
    return this.http.get(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}/${board.board_seq}`)
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }




  add(board: Board) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}`, JSON.stringify(board), { headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }




  edit(board: Board) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}`, JSON.stringify(board), { headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }




  delete(board: Board) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}`, { body: JSON.stringify(board), headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }





  getReplyAll(board_seq: string) {
    return this.http.get(`/api/board/reply?board_seq=${board_seq}`)
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }




  addReply(reply: Reply) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`/api/board/reply`, JSON.stringify(reply), { headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }




  deleteReply(reply: Reply) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete('/api/board/reply', { body: JSON.stringify(reply), headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data:', data))
      .catch(this._serverError)
  }

}