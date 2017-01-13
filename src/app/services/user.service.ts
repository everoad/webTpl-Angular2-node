import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http' 

import { User } from '../user'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
  constructor(
    private http: Http
  ) {}



  /**
   * @param  {User} user
   */
  login(user: User) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/api/auth/login', JSON.stringify(user), { headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }




  /**
   * @param  {User} user
   */
  join(user: User) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/api/auth/join', JSON.stringify(user), { headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }



  /**
   * Logout
   */
  logout() {
    return this.http.get('/api/auth/logout').toPromise()
      .then((res: Response) => res.json())
  }
  
}