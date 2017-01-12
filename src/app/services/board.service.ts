import { Injectable }      from '@angular/core'
import { Http, Headers }   from '@angular/http'

import { Board }           from '../board'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class BoardService {
  
  constructor(
    private http: Http
  ){}
  
  

  getList(data, query) {
    console.log(query)
    return this.http.get(`/api/board/${data.menu_fir_seq}/${data.menu_sec_seq}?data=${JSON.stringify(query)}`).toPromise()
      .then(res => res.json())
  }




  getDetail(data): Promise<Board> {
    return this.http.get(`/api/board/${data.menu_fir_seq}/${data.menu_fir_seq}/${data.board_seq}`).toPromise()
      .then(res => res.json())
  }






  add(board: Board) {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post(`/api/board/${board.menu_fir_seq}/${board.menu_fir_seq}`, JSON.stringify(board), { headers: headers }).toPromise()
      .then(res => res.json())
  }

}