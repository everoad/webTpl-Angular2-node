import { Injectable, ErrorHandler } from '@angular/core'

import { EventService } from './event.service'



@Injectable()
export class ExceptionHandler implements ErrorHandler {


  constructor(
    private eventService: EventService
  ) { }

  handleError(err: Error) {
    let orinalError = err['originalError']
  }


}