import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http' 

import { User } from '../user'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class UserService {
  constructor(
    private http: Http
  ) {}

  login(user: User): Promise<JSON> {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/api/user/login', JSON.stringify(user), { headers: headers }).toPromise()
      .then(res => res.json())
  }

  join(user: User): Promise<JSON> {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.post('/api/user/join', JSON.stringify(user), { headers: headers }).toPromise()
      .then(res => res.json())
  }

}