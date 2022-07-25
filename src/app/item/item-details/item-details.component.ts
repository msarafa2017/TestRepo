import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemListVm } from 'src/app/models/ItemListVm';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  providers: [ItemService]
})
export class ItemDetailsComponent implements OnInit {
  itemDetails!: ItemListVm;
  id!:number;

  constructor(private _service: ItemService, private route:ActivatedRoute) { 
    this.id= isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
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
