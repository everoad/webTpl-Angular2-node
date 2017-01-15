import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { LocalStorageService } from 'angular-2-local-storage'
import { Observable } from 'rxjs/Rx'
import { EventService } from './event.service'
import { User } from '../dtos/user'
import { Location } from '@angular/common'

@Injectable()
export class AuthGuard implements CanActivate {



  constructor(
    private router: Router,
    private ls: LocalStorageService,
    private eventService: EventService,
    private location: Location
  ) { }





  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    
    if (!this.ls.get("user")) {
      this.ls.set('redirectUrl', state.url)
      this.location.back()
      this.eventService.visibleChange.emit(true)
      return false
    }

    if (route.url[4] && route.url[4].path === 'edit'
       && (<User> this.ls.get('user')).user_email !== this.ls.get('board_user_email') + '') {
      this.ls.remove('board_user_email')
      this.location.back()
      return false
    }

    if (this.ls.get('board_user_email')) {
      this.ls.remove('board_user_email')
    }
    return true
  }
  
}