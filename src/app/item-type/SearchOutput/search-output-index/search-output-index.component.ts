import { Component, OnInit } from '@angular/core';
import { ItemTypeListVmResponse, ItemTypeSm } from '../../../models/ItemTypeListVm';
import { CommonService } from '../../../services/common.service';
import { ItemTypeService } from '../../../services/item-type.service';

@Component({
  selector: 'app-search-output-index',
  templateUrl: './search-output-index.component.html'
})
export class SearchOutputIndexComponent implements OnInit {
  itemTypes = {} as ItemTypeListVmResponse;

  constructor(private _service: ItemTypeService, private _commonService: CommonService) {
  }

  ngOnInit(): void {
    this.getAllItemTypes();
  }

  onSearch(searchModel: ItemTypeSm): void {
    if (searchModel.isActiveSm != null && searchModel.isActiveSm.toString() == 'null') {
      searchModel.isActiveSm = null;
    }
    else if (searchModel.isActiveSm != null) {
      searchModel.isActiveSm = searchModel.isActiveSm.toString() == 'true';
    }
    this._service.search(searchModel).subscribe(
      items => { this.itemTypes = items; },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }

  search(): void {
  }

  getAllItemTypes(): void {
    this._service.getAll().subscribe(
      items => { this.itemTypes = items; },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }

  deleteItem(id: number) {
    this._service.delete(id).subscribe(
      response => {
        this._commonService.viewMessage(response.message);
        if (response.isSuccess) {
          this.getAllItemTypes();
        }
      },
      error => { console.log(error); },
      () => { console.log('Done'); });
  }

}
