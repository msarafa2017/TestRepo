import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemTypeCreateUpdateVm, ItemTypeListVmResponse, ItemTypeSm, ItemTypeVmResponse } from '../models/ItemTypeListVm';

@Injectable({
  providedIn: 'root'
})
export class ItemTypeService {
  serviceUri:string = `${environment.Uri}ItemType`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.Token}` })
  };
  constructor(private client:HttpClient) { }

  getAll(): Observable<ItemTypeListVmResponse>{
    // return this.client.get<ItemTypeListVmResponse>(this.serviceUri,this.httpOptions).pipe(
      return this.client.get<ItemTypeListVmResponse>(this.serviceUri).pipe(
      catchError(this.handleError)
    );
  }
  getById(id:number): Observable<ItemTypeVmResponse>{
    return this.client.get<ItemTypeVmResponse>(`${this.serviceUri}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  search(searchModel:ItemTypeSm): Observable<ItemTypeListVmResponse>{
    return this.client.post<ItemTypeListVmResponse>(`${this.serviceUri}/FindAll`, searchModel).pipe(
      catchError(this.handleError)
    );
  }

  save(viewModel:ItemTypeCreateUpdateVm): Observable<ItemTypeVmResponse>{
    if(viewModel.id == 0){
      return this.client.post<ItemTypeVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }
    else{
      return this.client.put<ItemTypeVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }    
  }
  delete(id: number): Observable<ItemTypeVmResponse>{
    return this.client.delete<ItemTypeVmResponse>(`${this.serviceUri}/${id}`).pipe(
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
