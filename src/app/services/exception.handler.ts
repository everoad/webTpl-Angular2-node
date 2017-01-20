import { Injectable, ErrorHandler, Injector } from '@angular/core'
import { Router } from '@angular/router'


@Injectable()
export class ExceptionHandler implements ErrorHandler {

  router: Router

  constructor(
    private injector: Injector
  ) { }



  handleError(err: Error) {
    if (this.router == null) {
      this.router = this.injector.get(Router)
    }
    let orinalError = err['originalError']
    console.log('handler', err.stack)

    this.router.navigate(['error'])
  }


}