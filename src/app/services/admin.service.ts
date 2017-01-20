import { Injectable } from '@angular/core'
import { Http, Response, Headers } from '@angular/http'
import { MenuFir } from '../dtos/menuFir'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'  // debug
import 'rxjs/add/operator/catch'


@Injectable()
export class AdminService {



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


  getMenuAll() {
    return this.http.get('/api/menu')
      .map((res: Response) => res.json())
      .do(data => console.log('server data: ', data))
      .catch(this._serverError)
  }

  

  editMenu(menu) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put('/api/admin/menu', JSON.stringify(menu), { headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data: ', data))
      .catch(this._serverError)
  }

}