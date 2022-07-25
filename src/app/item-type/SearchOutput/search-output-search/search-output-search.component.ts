import { EventEmitter, Output } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ItemLookup } from '../../../models/ItemLookup';
import { ItemTypeSm } from '../../../models/ItemTypeListVm';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-search-output-search',
  templateUrl: './search-output-search.component.html'
})
export class SearchOutputSearchComponent implements OnInit {
  searchModel = { isActiveSm: null} as ItemTypeSm;
  activeLookup = [] as ItemLookup[];
  @Output() searchEvent = new EventEmitter<ItemTypeSm>();

  constructor(private _commonService: CommonService) {
    this.activeLookup = _commonService.fillActiveLookup();
  }

  ngOnInit(): void {
  }

  onSearchCkick(type: number) {
    if (type == 2) {
      this.searchModel = { nameSm: '', isActiveSm: null };
    }
    this.searchEvent.emit(this.searchModel);
  }

}
