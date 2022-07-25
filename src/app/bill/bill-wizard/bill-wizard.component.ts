import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bill-wizard',
  templateUrl: './bill-wizard.component.html'
})
export class BillWizardComponent implements OnInit {
  @Input() tap: string = 'create';
  @Input() id!:number;
  constructor() { }

  ngOnInit(): void {
  }

}
