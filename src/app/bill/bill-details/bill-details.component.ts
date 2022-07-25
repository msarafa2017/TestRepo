import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BillItemListVm } from 'src/app/models/BillListVm';
import { BillService } from 'src/app/services/bill.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-bill-details',
  templateUrl: './bill-details.component.html'
})
export class BillDetailsComponent implements OnInit {
  id!: number;
  itemDetails = {} as BillItemListVm;

  constructor(private _service: BillService, private _commonService: CommonService, private route: ActivatedRoute) { 
    this.id = isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
    this.billDetails();
  }

  ngOnInit(): void {
    this._commonService.setTitle('تفاصيل الفاتورة');
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

}
