import { Component, OnInit } from '@angular/core';
import { RegiserVm } from '../../models/LoginVm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {
  viewModel = {} as RegiserVm;
  constructor() { }

  ngOnInit(): void {
  }

  register() {
    debugger;
  }

}
