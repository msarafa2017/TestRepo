import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'item-not-exsit',
  templateUrl: './item-not-exsit.component.html'
})
export class ItemNotExsitComponent implements OnInit {
@Input() Redirect:string="/";
  constructor() { }

  ngOnInit(): void {
  }

}
