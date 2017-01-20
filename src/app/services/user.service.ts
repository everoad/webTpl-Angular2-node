import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { User } from '../dtos/user'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

@Injectable()
export class UserService {
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

  /**
   * @param  {User} user
   */
  login(user: User) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/api/auth/login', JSON.stringify(user), { headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data : ', data))
      .catch(this._serverError)
  }




  /**
   * @param  {User} user
   */
  join(user: User) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/api/auth/join', JSON.stringify(user), { headers: headers })
      .map((res: Response) => res.json())
      .do(data => console.log('server data : ', data))
      .catch(this._serverError)
  }



  /**
   * Logout
   */
  logout() {
    return this.http.get('/api/auth/logout')
      .map((res: Response) => res.json())
      .do(data => console.log('server data : ', data))
      .catch(this._serverError)
  }

}