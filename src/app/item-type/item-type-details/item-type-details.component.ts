import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemTypeListVm } from 'src/app/models/ItemTypeListVm';
import { ItemTypeService } from 'src/app/services/item-type.service';

@Component({
  selector: 'item-type-details',
  templateUrl: './item-type-details.component.html',
  providers:[ItemTypeService]
})
export class ItemTypeDetailsComponent implements OnInit {
itemDetails!:ItemTypeListVm;
id!:number;
  constructor(private _service:ItemTypeService, private route:ActivatedRoute) {
    this.id= isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
   }

  ngOnInit(): void {
    this.getItemDetails();
  }

  getItemDetails(){
    this._service.getById(this.id).subscribe(
      item=> {
        this.itemDetails = item.responseData;
      },
      error => {console.log(error);},
      ()=>{console.log('Done');});
  }
}
