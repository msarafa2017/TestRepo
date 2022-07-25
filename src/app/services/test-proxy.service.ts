import { Injectable } from '@angular/core';
import { CustomerVmResponse } from '../models/CustomerListVm';
import { RestService } from './RestService';

@Injectable({
  providedIn: 'root',  
})
export class TestProxyService {
  restService: RestService = {} as RestService;
  constructor() { }

  apiName = 'Aseel';

  //create = (input: CreateUpdateRequestAttachmentTypeDto) =>
  //  this.restService.request<any, RequestAttachmentTypeDto>({
  //    method: 'POST',
  //    url: '/api/aseel/RequestAttachmentType',
  //    body: input,
  //  },
  //    { apiName: this.apiName });


  //save(viewModel: CustomerCreateUpdateVm): Observable<CustomerVmResponse> {
  //  if (viewModel.id == undefined || viewModel.id == 0) {
  //    return this.client.post<CustomerVmResponse>(this.serviceUri, viewModel).pipe(
  //      catchError(this.handleError)
  //    );
  //  }
  //  else {
  //    return this.client.put<CustomerVmResponse>(this.serviceUri, viewModel).pipe(
  //      catchError(this.handleError)
  //    );
  //  }
  //}

  delete = (id: number) =>
    this.restService.request<any, CustomerVmResponse>({
      method: 'DELETE',
      url: `https://localhost:44380/Customer/${id}`,
    });



}
