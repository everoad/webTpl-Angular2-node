import { Injectable } from '@angular/core'

import { Http, Response, Headers } from '@angular/http'

import { MenuFir } from '../dtos/menuFir'
import 'rxjs/add/operator/toPromise'



@Injectable()
export class AdminService {



  constructor(
    private http: Http
  ) { }



  getMenuAll(): Promise<MenuFir[]> {
    return this.http.get('/api/admin/menu').toPromise()
      .then((res: Response) => res.json())
  }

  

  editMenu(menu) {
    var headers = new Headers()
    headers.append('Content-Type', 'application/json')
    return this.http.put('/api/admin/menu', JSON.stringify(menu), { headers: headers }).toPromise()
      .then((res: Response) => res.json())
  }

}