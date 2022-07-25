import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillMainCreateUpdateVm } from 'src/app/models/BillListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.component.html'
})
export class UpdateComponent implements OnInit {
  frmUpdateBill = {} as FormGroup;
  ActiveWizard: string = 'Update';
  id!: number;
  viewModel = {} as BillMainCreateUpdateVm;
  customerLookup = [] as ItemLookup[];

  constructor(private frmBuilder: FormBuilder, private _service: BillService, private _commonService: CommonService, private route: ActivatedRoute, private _router: Router, private headerService: HeaderService) {
    this.id = isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._commonService.setTitle('تعديل بيانات الفاتورة');
    this._commonService.fillCustomerLookup().subscribe(
      items => {
        this.customerLookup = items;
      },
      error => { console.log(error); },
      () => { console.log('Done'); });

    this.resetForm();
  }
  getItemDetails() {
    this._service.getById(this.id).subscribe(
      item => {
        this.viewModel = item.responseData as BillMainCreateUpdateVm;
        this.buildForm();
      },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }

  updateItem(type: number) {
    if (this.frmUpdateBill.valid) {
      this._service.save(this.frmUpdateBill.value as BillMainCreateUpdateVm).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
          if (response.isSuccess) {
            if (type == 1) {
              this._router.navigate(['ClientLayout/AddItems/', this.id]);
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
    this.getItemDetails();
  }
  buildForm(): void {
    this.frmUpdateBill = this.frmBuilder.group({
      id: [this.viewModel.id, [Validators.required]],
      billNumber: [this.viewModel.billNumber, [Validators.required, Validators.maxLength(10)]],
      customerId: [this.viewModel.customerId.toString(), [Validators.required]],
      totalPrice: [this.viewModel.totalPrice, [Validators.required]],
      discount: [this.viewModel.discount, [Validators.required]]
    });
  }

}
