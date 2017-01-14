import { Injectable, EventEmitter } from '@angular/core'


@Injectable()
export class EventService {
  

  /**
   * LoginComponent Visible.
   */
  public visibleChange: EventEmitter<boolean>


  constructor() {
    this.visibleChange = new EventEmitter<boolean>()
  }

}