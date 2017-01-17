import { Injectable }      from '@angular/core'
import { Http, Headers, Response }   from '@angular/http'

import { Reply } from '../dtos/reply'
import { Board } from '../dtos/board'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class BoardService {
  
  
  constructor(
    private http: Http
  ) { }
  
  

  getAll(data, query) {
    return this.http.get(`/api/board/${data.menu_fir_seq}/${data.menu_sec_seq}?data=${JSON.stringify(query)}`).toPromise()
      .then((res: Response) => res.json())
  }




  getOne(board: Board) {
    return this.http.get(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}/${board.board_seq}`).toPromise()
      .then((res: Response) => res.json())
  }




  add(board: Board) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}`, JSON.stringify(board), { headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }




  edit(board: Board) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}`, JSON.stringify(board), { headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }




  delete(board: Board) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete(`/api/board/${board.menu_fir_seq}/${board.menu_sec_seq}`, { body: JSON.stringify(board), headers: headers }).toPromise()
      .then((res: Response) => res.json())  
  }





  getReplyAll(board_seq: string) {
    return this.http.get(`/api/board/reply?board_seq=${board_seq}`).toPromise()
      .then((res: Response) => res.json())
  }




  addReply(reply: Reply) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post(`/api/board/reply`, JSON.stringify(reply), { headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }




  deleteReply(reply: Reply) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.delete('/api/board/reply', { body: JSON.stringify(reply), headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }

}