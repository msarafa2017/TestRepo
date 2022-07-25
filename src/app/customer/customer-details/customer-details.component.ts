import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerListVm } from 'src/app/models/CustomerListVm';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  providers:[CustomerService]
})
export class CustomerDetailsComponent implements OnInit {
  itemDetails!: CustomerListVm;
  id!:number;
  constructor(private _service:CustomerService, private route:ActivatedRoute) { 
    this.id = isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this._service.getById(this.id).subscribe(
      item=>{
        this.itemDetails = item.responseData;
      },
      error => {console.log(error);},
      ()=>{console.log('Done');}
    );
  }

}
