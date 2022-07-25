import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conditional',
  templateUrl: './conditional.component.html'
})
export class ConditionalComponent implements OnInit {
  showContent: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
