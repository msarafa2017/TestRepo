import { Component, OnInit } from '@angular/core';
import { ItemListVmResponse, ItemSm } from '../models/ItemListVm';
import { ItemLookup } from '../models/ItemLookup';
import { CommonService } from '../services/common.service';
import { ItemService } from '../services/item.service';
import { TestProxyService } from '../services/test-proxy.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  providers: [ItemService]
})
export class ItemComponent implements OnInit {
  itemsData!:ItemListVmResponse;
  activeLookup:ItemLookup[];
  itemTypeLookup!:ItemLookup[];
  searchModel:ItemSm = {nameSm: '', itemTypeIdSm: 0, isActiveSm: null};

  constructor(private _service: ItemService, private _commonService: CommonService, private _test: TestProxyService) {
    this.activeLookup = _commonService.fillActiveLookup();
    _commonService.fillItemTypeLookup().subscribe(
      items => {this.itemTypeLookup = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');});
   }

  ngOnInit(): void {
    this.getAllItems();
    debugger;
    this._test.delete(6).subscribe(
      // do something with the response
    );
  }

  getAllItems(): void {
    this.searchModel = {nameSm: '', itemTypeIdSm: 0, isActiveSm: null};
    this._service.getAll().subscribe(
      items => {this.itemsData = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');}
    );
  }
  search(): void{
    if(this.searchModel.isActiveSm != null &&  this.searchModel.isActiveSm.toString() == 'null'){
      this.searchModel.isActiveSm = null;
    }
    else if(this.searchModel.isActiveSm != null){
      this.searchModel.isActiveSm = this.searchModel.isActiveSm.toString() == 'true';
    }
    this._service.search(this.searchModel).subscribe(
      items => {this.itemsData = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');}
    );
  }
  deleteItem(id: number){
    this._service.delete(id).subscribe(
      response => {
        this._commonService.viewMessage(response.message);
        if(response.isSuccess){
          this.search();
        }
      },
        error => {console.log(error);},
        ()=>{console.log('Done');});
  }
  
}
