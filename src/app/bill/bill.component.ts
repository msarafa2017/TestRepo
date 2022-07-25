import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BillMainListVm, BillSm } from '../models/BillListVm';
import { ItemLookup } from '../models/ItemLookup';
import { BillService } from '../services/bill.service';
import { CommonService } from '../services/common.service';
import { HeaderService } from '../services/header.service';
import { MatDialog } from '@angular/material/dialog';
import { BillItemsDialogComponent } from './bill-items-dialog/bill-items-dialog.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html'
})
export class BillComponent implements OnInit, AfterViewInit {
  frmBillSearch = {} as FormGroup;
  itemsData = [] as BillMainListVm[];
  customerLookup = [] as ItemLookup[];
  searchModel = {} as BillSm;

  constructor(private frmBuilder: FormBuilder, private _service: BillService, private _commonService: CommonService, private headerService: HeaderService, public dialog: MatDialog) {
    this.buildForm();
  }

  ngOnInit(): void {
    this._commonService.setTitle('الفواتير');
    this._commonService.fillCustomerLookup().subscribe(
      items => { this.customerLookup = items; },
      error => { console.log(error); },
      () => { console.log('Done'); });
    this.getAllItems();
  }
  ngAfterViewInit() {
    Promise.resolve().then(() => this.headerService.changeHeaderTitle(2));
    // setTimeout(() => {
    //   this.headerService.changeHeaderTitle(2);
    // }, 0);
  }

  getAllItems(): void {
    this.resetForm();
    this.search();
  }
  search(): void {
    this._service.search(this.frmBillSearch.value as BillSm).subscribe(
      items => { this.itemsData = items.responseData; },
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
  openDialog(id: number) {
    const dialogRef = this.dialog.open(BillItemsDialogComponent, {
      width: '60%',
      data: { id: id }
    });
    dialogRef.afterClosed().subscribe(result => {
      //console.log(`Dialog result: ${result}`);
    });
  }

  resetForm(): void {
    this.frmBillSearch.reset();
  }
  buildForm(): void {
    this.frmBillSearch = this.frmBuilder.group({
      billNumberSm: [this.searchModel.billNumberSm || ''],
      customerIdSm: [this.searchModel.customerIdSm || null],
      dateFromSm: [this.searchModel.dateFromSm || null],
      dateToSm: [this.searchModel.dateToSm || null],
    });
  }
}
