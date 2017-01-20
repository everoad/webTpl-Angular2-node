import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'

import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/throw'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'


@Injectable()
export class IndexService {

  constructor(
    private http: Http
  ) { }

  private _serverError(err) {
    console.log('server error: ', err)
    if (err instanceof Response) {
      return Observable.throw(err.json().error || 'backend server error')
    } else {
      return Observable.throw(err || 'backend server error')
    }
  }



  getMenu() {
    return this.http.get('/api/menu')
      .map((res: Response) => res.json())
      .do(data => console.log('server data : ', data))
      .catch(this._serverError)
  }



  getMainList() {
    return this.http.get('/api/main')
      .map((res: Response) => res.json())
      .do(data => console.log('server data : ', data))
      .catch(this._serverError)
  }



  uploadImg(file: File) {
    var formData = new FormData()
    formData.append('file', file)
    return this.http.post('/api/upload', formData)
      .map((res: Response) => res.json())
      .do(data => console.log('server data : ', data))
      .catch(this._serverError)
  }
}