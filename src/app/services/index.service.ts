import { Injectable } from '@angular/core'
import { Http, Headers } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class IndexService {

  constructor(
    private http: Http
  ) { }

  getMenu(): Promise<JSON> {
    return this.http.get('/api/menu').toPromise()
      .then(res => res.json())
  }

  getMainList(): Promise<JSON> {
    return this.http.get('/api/board/main').toPromise()
      .then(res => res.json())
  }
}