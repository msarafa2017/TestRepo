import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BillItemList } from 'src/app/models/BillListVm';
import { BillService } from 'src/app/services/bill.service';

@Component({
  selector: 'app-bill-items-dialog',
  templateUrl: './bill-items-dialog.component.html'
})
export class BillItemsDialogComponent {
  itemDetails = [] as BillItemList[];

  constructor(private _service: BillService, dialogRef: MatDialogRef<BillItemsDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any){
    debugger;
    this._service.getBillItems(data.id).subscribe(
      item => {
        this.itemDetails = item.responseData;
      },
      error => { console.log(error); },
      () => { console.log('Done'); }
    );
  }
}

