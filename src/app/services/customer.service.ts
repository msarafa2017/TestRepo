import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CustomerCreateUpdateVm, CustomerListVmResponse, CustomerSm, CustomerVmResponse } from '../models/CustomerListVm';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  serviceUri:string = `${environment.Uri}Customer`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.Token}` })
  };

  constructor(private client:HttpClient) { }
  
  getAll(): Observable<CustomerListVmResponse>{
      return this.client.get<CustomerListVmResponse>(this.serviceUri).pipe(
      catchError(this.handleError)
    );
  }
  getById(id:number): Observable<CustomerVmResponse>{
    return this.client.get<CustomerVmResponse>(`${this.serviceUri}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  search(searchModel:CustomerSm): Observable<CustomerListVmResponse>{
    return this.client.post<CustomerListVmResponse>(`${this.serviceUri}/FindAll`, searchModel).pipe(
      catchError(this.handleError)
    );
  }

  save(viewModel: CustomerCreateUpdateVm): Observable<CustomerVmResponse>{
    if (viewModel.id == undefined || viewModel.id == 0) {
      return this.client.post<CustomerVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }
    else{
      return this.client.put<CustomerVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }    
  }
  delete(id: number): Observable<CustomerVmResponse>{
    return this.client.delete<CustomerVmResponse>(`${this.serviceUri}/${id}`).pipe(
      catchError(this.handleError)
    );
  }


   // Handle API errors
   handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred:', error.error.message);
    } else {
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      console.log('Something bad happened; please try again later.'));
  };
}
