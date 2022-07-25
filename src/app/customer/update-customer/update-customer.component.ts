import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerCreateUpdateVm } from 'src/app/models/CustomerListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.component.html',
  providers: [CustomerService]
})
export class UpdateCustomerComponent implements OnInit {
  frmUpdateCustomer = {} as FormGroup;
  viewModel = {} as CustomerCreateUpdateVm;
  activeLookup = [] as ItemLookup[];
  id: number;
  constructor(private frmBuilder: FormBuilder, private _service: CustomerService, private _commonService: CommonService, private route: ActivatedRoute, private _router: Router) {
    this.id = isNaN(+route.snapshot.params['id']) ? 0 : route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.activeLookup = this._commonService.fillActiveLookup();
    this.resetForm();
  }

  getItemDetails() {
    this._service.getById(this.id).subscribe(
      item => {
        this.viewModel = item.responseData as CustomerCreateUpdateVm;
        this.buildForm();
      },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }
  updateItem() {
    if (this.frmUpdateCustomer.valid) {
      this._service.save(this.frmUpdateCustomer.value as CustomerCreateUpdateVm).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
          if (response.isSuccess) {
            this._router.navigate(['AdminLayout/Customer']);
          }
        },
        error => { console.log(error); },
        () => { console.log('Done'); });
    }
    else {
      this._commonService.viewMessage(`error, error, error`);
    }
  }

  resetForm(): void {
    this.getItemDetails();
  }
  buildForm(): void {
    this.frmUpdateCustomer = this.frmBuilder.group({
      id: [this.viewModel.id, Validators.required],
      rowVersion: [this.viewModel.rowVersion, Validators.required],
      nameAr: [this.viewModel.nameAr, [Validators.required, Validators.maxLength(150)]],
      nameEn: [this.viewModel.nameEn, [Validators.required, Validators.maxLength(150)]],
      mobile: [this.viewModel.mobile, [Validators.required, Validators.maxLength(15)]],
      email: [this.viewModel.email, [Validators.required, Validators.maxLength(50)]],
      isActive: [this.viewModel.isActive, [Validators.required]],
      address: [this.viewModel.address, [Validators.maxLength(1500)]]
    });
  }
}
