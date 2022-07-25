import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ItemLookup } from 'src/app/models/ItemLookup';
import { ItemTypeCreateUpdateVm } from 'src/app/models/ItemTypeListVm';
import { CommonService } from 'src/app/services/common.service';
import { ItemTypeService } from 'src/app/services/item-type.service';

@Component({
  selector: 'update-item-type',
  templateUrl: './update-item-type.component.html',
  providers: [ItemTypeService]
})
export class UpdateItemTypeComponent implements OnInit {
  viewModel!:ItemTypeCreateUpdateVm;
  activeLookup:ItemLookup[];
  id!:number;

  constructor(private _service:ItemTypeService, private _commonService:CommonService, private route:ActivatedRoute) { 
    this.id= isNaN(+this.route.snapshot.params['id']) ? 0 : this.route.snapshot.params['id'];
    this.activeLookup = _commonService.fillActiveLookup();
    this.getItemDetails();
  }

  ngOnInit(): void {
    
  }

  getItemDetails(){
    this._service.getById(this.id).subscribe(
      item=> {
        this.viewModel = item.responseData;//= {id:item.responseData.id, nameAr: item.responseData.nameAr, nameEn: item.responseData.nameEn, isActive: item.responseData.isActive, rowVersion: item.responseData.rowVersion};
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
    // this.activeLookup.
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
