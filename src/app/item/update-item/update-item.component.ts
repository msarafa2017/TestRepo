import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemCreateUpdateVm } from 'src/app/models/ItemListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { CommonService } from 'src/app/services/common.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-update-item',
  templateUrl: './update-item.component.html',
  providers: [ItemService]
})
export class UpdateItemComponent implements OnInit {
  viewModel!: ItemCreateUpdateVm;
  activeLookup!: ItemLookup[];
  itemTypeLookup!: ItemLookup[];
  id: number;

  constructor(private _service: ItemService, private _commonService: CommonService, private route: ActivatedRoute) { 
    this.id= isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
    this.activeLookup = _commonService.fillActiveLookup();
    _commonService.fillItemTypeLookup().subscribe(
      items => {this.itemTypeLookup = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');});
    this.getItemDetails();
  }

  ngOnInit(): void {
  }

  getItemDetails(){
    this._service.getById(this.id).subscribe(
      item=> {
        this.viewModel = {id: item.responseData.id, itemTypeId: item.responseData.itemTypeId, nameAr: item.responseData.nameAr, nameEn: item.responseData.nameEn, isActive:item.responseData.isActive, rowVersion: item.responseData.rowVersion};
      },
      error => {console.log(error);},
      ()=>{console.log('Done');});
  }
  updateItem(){
    if(this.isValid()){
      this.viewModel.isActive = this.viewModel.isActive.toString() == 'true';
      this._service.save(this.viewModel).subscribe(
        response => {
          this._commonService.viewMessage(response.message);
        if(response.isSuccess){
          this.clear();
        }
        },
          error => {console.log(error);},
          ()=>{console.log('Done');});
    }
  }
   // Reset on adding new
   clear(): void {
    this.getItemDetails();
  }
  isValid(): boolean{
    let errorCount = 0;
    if(this.viewModel.nameAr == ''){
      errorCount++;
    }
    if(this.viewModel.nameEn == ''){
      errorCount++;
    }
    if(this.viewModel.itemTypeId == 0){
      errorCount++;
    }

    if(errorCount==0){
      return true;
    }
    return false;
  }

}
