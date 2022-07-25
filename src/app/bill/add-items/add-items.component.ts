import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BillDetailVm, BillItemList } from 'src/app/models/BillListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';
import { HeaderService } from 'src/app/services/header.service';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html'
})
export class AddItemsComponent implements OnInit {
  ActiveWizard: string = 'AddItems';
  viewModel = {} as BillDetailVm;
  id!: number;
  itemLookup = [] as ItemLookup[];
  billItems = [] as BillItemList[];

  constructor(private _service: BillService, private _commonService: CommonService, private route: ActivatedRoute, private _router: Router, private headerService: HeaderService) {
    this.id = isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
    this.viewModel = { id: 0, billMainId: this.id, itemId: 0, amount: 1, totalPrice: 0 }
    _commonService.fillItemLookup().subscribe(
      items => { this.itemLookup = items; },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }

  ngOnInit(): void {
    this._commonService.setTitle('أصناف الفاتورة');
    this.getBillItems();
  }
  getBillItems() {
    this._service.getBillItems(this.id).subscribe(
      items => {
        this.billItems = items.responseData;
      },
      error => { console.log(error); },
      () => { console.log('Done'); }
    );
  }
  changeItem() {
    if (this.viewModel.amount.toString() == '' || this.viewModel.amount == 0) {
      this.viewModel.amount = 1;
      this.viewModel.totalPrice = 0;
    }
    if (this.viewModel.itemId != 0 && this.viewModel.amount != 0) {
      this._service.getItemPrice(+this.viewModel.itemId).subscribe(
        response => {
          this.viewModel.totalPrice = this.viewModel.amount * response;
        },
        error => { console.log(error); },
        () => { console.log('Done'); }
      );
    }
  }
  addItem() {
    if (this.isValid()) {
      this._service.addDetails(this.viewModel).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
          if (response.isSuccess) {
            this.clear();
            this.getBillItems();
          }
        },
        error => { console.log(error); },
        () => { console.log('Item Added Successfully'); }
      );
    }
  }
  deleteItem(id: number) {
    this._service.deleteDetails(id).subscribe(
      response => {
        this.clear();
        this._commonService.viewMessage(response.message);
        if (response.isSuccess) {
          this.getBillItems();
        }
      },
      error => { console.log(error); },
      () => { console.log('Done'); });

  }

  updatebill(type: number) {
    if (this.isValid()) {
      this._service.addDetails(this.viewModel).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
          if (response.isSuccess) {
            if (type == 1) {
              this._router.navigate(['ClientLayout/SaveBill/', this.id]);
            }
            else {
              this._router.navigate(['ClientLayout/Bill']);
            }
          }
        },
        error => { console.log(error); },
        () => { console.log('Item Added Successfully'); }
      );
    }
    else {
      if (type == 1) {
        this._router.navigate(['ClientLayout/SaveBill/', this.id]);
      }
      else {
        this._router.navigate(['ClientLayout/Bill']);
      }
    }
  }


  // Reset on adding new
  clear(): void {
    this.viewModel = { id: 0, billMainId: this.id, itemId: 0, amount: 1, totalPrice: 0 } as BillDetailVm;
  }
  isValid(): boolean {
    let errorCount = 0;
    if (this.viewModel.amount.toString() == '' || this.viewModel.amount == 0) {
      errorCount++;
    }
    if (this.viewModel.itemId == 0) {
      errorCount++;
    }
    if (this.viewModel.totalPrice.toString() == '' || this.viewModel.totalPrice == 0) {
      errorCount++;
    }

    if (errorCount == 0) {
      return true;
    }
    return false;
  }
}
