import { Component, OnInit } from '@angular/core';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { ItemTypeCreateUpdateVm, ItemTypeListVm } from 'src/app/models/ItemTypeListVm';
import { CommonService } from 'src/app/services/common.service';
import { ItemTypeService } from 'src/app/services/item-type.service';

@Component({
  selector: 'create-item-type',
  templateUrl: './create-item-type.component.html',
  providers:[ItemTypeService]
})
export class CreateItemTypeComponent implements OnInit {
  viewModel!:ItemTypeCreateUpdateVm;
  activeLookup:ItemLookup[];

  constructor(private _service:ItemTypeService, private _commonService:CommonService) {
    this.clear();
    this.activeLookup=_commonService.fillActiveLookup();
   }

  ngOnInit(): void {
  }

  createItem(){
    if(this.isValid()){
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
      isActive: true
    } as ItemTypeListVm;
  }

  isValid(): boolean{
    let errorCount = 0;
    if(this.viewModel.nameAr == ''){
      errorCount++;
    }
    if(this.viewModel.nameEn == ''){
      errorCount++;
    }

    if(errorCount==0){
      return true;
    }
    return false;
  }

}
