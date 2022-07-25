import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillItemListVm, BillMainUpdateVm } from 'src/app/models/BillListVm';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-save-bill',
  templateUrl: './save-bill.component.html'
})
export class SaveBillComponent implements OnInit {
  ActiveWizard: string = 'SaveBill';
  id!: number;
  itemDetails = {} as BillItemListVm;
  viewModel={} as BillMainUpdateVm;

  constructor(private _service: BillService, private _commonService: CommonService, private route: ActivatedRoute, private _router: Router) {
    this.id = isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
    this.billDetails();
  }

  ngOnInit(): void {
    this._commonService.setTitle('حفظ بيانات الفاتورة');
  }

  billDetails() {
    this._service.billDetails(this.id).subscribe(
      item => {
        this.itemDetails = item.responseData;
      },
      error => { console.log(error); },
      () => { console.log('Done'); }
    );
  }
  save(type: number) {
    this.viewModel.id = this.id;
    this.viewModel.discount = this.itemDetails.discount;
    if(type == 1){
      this.viewModel.submitType = 1;
    }
    else{
      this.viewModel.submitType = 2;
    }
    this._service.updateBill(this.viewModel).subscribe(
      response => {
        this._commonService.viewMessage(response.message);
        if (response.isSuccess) {
          if (type == 1) {
            this._router.navigate(['ClientLayout/BillDetails/', response.responseData]);
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

  changeDiscount() {
    this.itemDetails.discount = isNaN(+this.itemDetails.discount) || this.itemDetails.discount.toString() == ""  ? 0 : this.itemDetails.discount;
    let totalPriceOfItems: number = this.itemDetails.items.reduce((sum, current)=> sum+current.totalPrice, 0)
    let totalDiscount: number = totalPriceOfItems * this.itemDetails.discount / 100;
    this.itemDetails.totalPrice = totalPriceOfItems - totalDiscount;
  }

}
