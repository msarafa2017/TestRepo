import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginVm } from '../models/LoginVm';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {
  viewMode = {} as LoginVm;
  constructor(private _commonService: CommonService, private _router: Router) {
    
  }

  ngOnInit(): void {
    this._commonService.setTitle("تسجيل الدخول");
  }

  onLogin() {
    if (this.viewMode.userName == "myoussef" && this.viewMode.password == "Mariam@21") {
      this._router.navigate(['ClientLayout/Bill']);
    }
    else {
      debugger;
      this._commonService.viewMessage("success,عملية ناجحة,تم حذف البيانات بنجاح");
    }
  }

}
