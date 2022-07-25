import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  private _ActiveMenue: number = 1;
  subject = new Subject();
  constructor() { }

  changeHeaderTitle(newActiveMenue: number) {
    this._ActiveMenue = newActiveMenue;
    this.subject.next(this._ActiveMenue);
  }
  clear() {
    this._ActiveMenue = 1;
    this.subject.next(this._ActiveMenue);
  }
}
