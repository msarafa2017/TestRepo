import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerListVm, CustomerListVmResponse, CustomerSm } from '../models/CustomerListVm';
import { ItemLookup } from '../models/ItemLookup';
import { CommonService } from '../services/common.service';
import { CustomerService } from '../services/customer.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  frmCustomerSearch = {} as FormGroup;
  itemsData = [] as CustomerListVm[];
  activeLookup = [] as ItemLookup[];
  searchModel = {} as CustomerSm;

  constructor(private frmBuilder: FormBuilder, private _service: CustomerService, private _commonService: CommonService) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.activeLookup = this._commonService.fillActiveLookup();
    this.getAllItems();
  }

  getAllItems(): void {
    this.resetForm();
    this.search();
  }
  search(): void {
    this._service.search(this.frmCustomerSearch.value as CustomerSm).subscribe(
      items => { this.itemsData = items.responseData as CustomerListVm[]; },
      error => { console.log(error); },
      () => { console.log('Done'); }
    );
  }
  deleteItem(id: number) {
    this._service.delete(id).subscribe(
      response => {
        this._commonService.viewMessage(response.message);
        if (response.isSuccess) {
          this.search();
        }
      },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }
  resetForm(): void {
    this.frmCustomerSearch.reset();
  }
  buildForm(): void {
    this.frmCustomerSearch = this.frmBuilder.group({
      nameSm: [this.searchModel.nameSm || ''],
      mobileSm: [this.searchModel.mobileSm || ''],
      emailSm: [this.searchModel.emailSm || ''],
      isActiveSm: [this.searchModel.isActiveSm || null]
    });
  }

}
