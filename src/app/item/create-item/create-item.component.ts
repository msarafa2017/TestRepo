import { Component, OnInit } from '@angular/core';
import { ItemCreateUpdateVm } from 'src/app/models/ItemListVm';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { CommonService } from 'src/app/services/common.service';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-create-item',
  templateUrl: './create-item.component.html',
  providers:[ItemService]
})
export class CreateItemComponent implements OnInit {
  viewModel!:ItemCreateUpdateVm;
  activeLookup:ItemLookup[];
  itemTypeLookup!:ItemLookup[];

  constructor(private _service:ItemService, private _commonService:CommonService) {
    this.clear();
    this.activeLookup = _commonService.fillActiveLookup();
    _commonService.fillItemTypeLookup().subscribe(
      items => {this.itemTypeLookup = items;},
        error => {console.log(error);},
        ()=>{console.log('Done');});
   }

  ngOnInit(): void {
  }

  createItem(){
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
          ()=>{console.log('Done');}
      );
    }
  }

  // Reset on adding new
  clear(): void {
    this.viewModel = {
      id: 0,
      nameAr: '',
      nameEn: '',
      itemTypeId: 0,
      isActive: true
    } as ItemCreateUpdateVm;
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
