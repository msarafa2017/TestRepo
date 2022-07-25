import { Component, OnInit } from '@angular/core';
import { ItemLookup } from '../models/ItemLookup';
import { ItemTypeListVmResponse, ItemTypeSm } from '../models/ItemTypeListVm';
import { CommonService } from '../services/common.service';
import { ItemTypeService } from '../services/item-type.service';

@Component({
  selector: 'item-type',
  templateUrl: './item-type.component.html',
  providers:[ItemTypeService]
})
export class ItemTypeComponent implements OnInit {
  itemTypes = {} as ItemTypeListVmResponse;
  activeLookup:ItemLookup[];
  searchModel:ItemTypeSm={nameSm:'',isActiveSm:null};
  constructor(private _service:ItemTypeService, private _commonService:CommonService) { 
    this.activeLookup=_commonService.fillActiveLookup();
  }

  ngOnInit(): void {
    this.getAllItemTypes();
  }

  search(): void {
    this._service.search(this.searchModel).subscribe(
      items => {this.itemTypes = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');});
  }
  getAllItemTypes(): void {
    this.searchModel={nameSm:'',isActiveSm:null};
    this._service.getAll().subscribe(
      items => {this.itemTypes = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');});
  }
  deleteItem(id: number){
    this._service.delete(id).subscribe(
      response => {
        this._commonService.viewMessage(response.message);
        if(response.isSuccess){
          this.getAllItemTypes();
        }
      },
        error => {console.log(error);},
        ()=>{console.log('Done');});
  }

}
