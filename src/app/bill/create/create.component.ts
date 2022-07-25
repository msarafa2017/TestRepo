import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillMainCreateUpdateVm } from 'src/app/models/BillListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html'
})
export class CreateComponent implements OnInit, AfterViewInit {
  ActiveWizard: string = 'Create';
  frmCreateBill = {} as FormGroup;
  viewModel = {} as BillMainCreateUpdateVm;
  customerLookup = [] as ItemLookup[];
  constructor(private frmBuilder: FormBuilder, private _service: BillService, private _commonService: CommonService, private _router: Router, private headerService: HeaderService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this._commonService.setTitle('اضافة بيانات الفاتورة');
    this._commonService.fillCustomerLookup().subscribe(
      items => { this.customerLookup = items; },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }
  ngAfterViewInit() {
    Promise.resolve().then(() => this.headerService.changeHeaderTitle(1));
    // setTimeout(() => {
    //   this.headerService.changeHeaderTitle(1);
    // }, 0);
  }
  createItem(type: number) {
    debugger;
    if (this.frmCreateBill.valid) {
      this._service.save(this.frmCreateBill.value as BillMainCreateUpdateVm).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
          if (response.isSuccess) {
            this.resetForm();
            if (type == 1) {
              this._router.navigate(['ClientLayout/AddItems/', response.responseData.id]);
            }
            else {
              this._router.navigate(['ClientLayout/Bill']);
            }
          }
        },
        error => { console.log(error); },
        () => { console.log('Done'); }
      );
    }
    else {
      this._commonService.viewMessage(`error, error, error`);
    }
  }
  resetForm(): void {
    this.frmCreateBill.reset();
  }
  buildForm(): void {
    this.frmCreateBill = this.frmBuilder.group({
      billNumber: [this.viewModel.billNumber || '', [Validators.required, Validators.maxLength(10)]],
      customerId: [this.viewModel.customerId || null, [Validators.required]],
      totalPrice: [this.viewModel.totalPrice || 0],
      discount: [this.viewModel.discount || 0]
    });
  }

}
