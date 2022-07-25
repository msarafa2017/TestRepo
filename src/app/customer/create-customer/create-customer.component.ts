import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerCreateUpdateVm } from 'src/app/models/CustomerListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { CommonService } from 'src/app/services/common.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  providers:[CustomerService]
})
export class CreateCustomerComponent implements OnInit {
  frmCreateCustomer: FormGroup;
  viewModel = { isActive: true } as CustomerCreateUpdateVm;
  activeLookup = [] as ItemLookup[];
  constructor(private frmBuilder: FormBuilder, private _service: CustomerService, private _commonService: CommonService) {
    this.frmCreateCustomer = this.buildForm();
  }

  ngOnInit(): void {
    this.resetForm();
    this.activeLookup = this._commonService.fillActiveLookup();
  }

  onKeypressEvent(event: any){
    var allowOnlyNumber = event.target.classList.contains('allowOnlyNumber');
 
  }
  createItem() {
    if (this.frmCreateCustomer.valid) {
      this._service.save(this.frmCreateCustomer.value as CustomerCreateUpdateVm).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
          if (response.isSuccess) {
            this.resetForm();
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

  // Reset on adding new
  resetForm(): void {
    this.frmCreateCustomer.reset();
  }

  buildForm(): any {
    return this.frmBuilder.group({
      nameAr: [this.viewModel.nameAr || '', [Validators.required, Validators.maxLength(150)]],
      nameEn: [this.viewModel.nameEn || '', [Validators.required, Validators.maxLength(150)]],
      mobile: [this.viewModel.mobile || '', [Validators.required, Validators.maxLength(15)]],
      email: [this.viewModel.email || '', [Validators.required, Validators.maxLength(50)]],
      isActive: [this.viewModel.isActive || true, [Validators.required]],
      address: [this.viewModel.address || '', [Validators.maxLength(1500)]]
    });
  }

}
