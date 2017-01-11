import { Injectable } from '@angular/core'
import { Http, Headers, Response } from '@angular/http'
import 'rxjs/add/operator/toPromise'

@Injectable()
export class IndexService {

  constructor(
    private http: Http
  ) { }

  getMenu() {
    return this.http.get('/api/menu').toPromise()
      .then((res: Response) => res.json())
  }

  getMainList() {
    return this.http.get('/api/board/main').toPromise()
      .then((res: Response) => res.json())
  }

  uploadImg(file) {
    var formData = new FormData()
    formData.append('file', file)
    return this.http.post('/api/upload', formData).toPromise()
      .then((res: Response) => res.json())

  }
}