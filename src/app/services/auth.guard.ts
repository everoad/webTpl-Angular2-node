import { Injectable } from '@angular/core'
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router'
import { LocalStorageService } from 'angular-2-local-storage'
import { Observable } from 'rxjs/Rx'
import { EventService } from './event.service'

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private ls: LocalStorageService,
    private eventService: EventService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    
    if (!this.ls.get("user")) {
      this.ls.set('redirectUrl', state.url)
      this.router.navigateByUrl(window.location.href)
      this.eventService.visibleChange.emit(true)
      return false
    }

    return true
  }
}