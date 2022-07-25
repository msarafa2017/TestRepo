import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ItemCreateUpdateVm, ItemListVmResponse, ItemSm, ItemVmResponse } from '../models/ItemListVm';

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  serviceUri:string = `${environment.Uri}Item`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.Token}` })
  };

  constructor(private client:HttpClient) { }

  getAll(): Observable<ItemListVmResponse>{
      return this.client.get<ItemListVmResponse>(this.serviceUri).pipe(
      catchError(this.handleError)
    );
  }
  getById(id:number): Observable<ItemVmResponse>{
    return this.client.get<ItemVmResponse>(`${this.serviceUri}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  search(searchModel:ItemSm): Observable<ItemListVmResponse>{
    return this.client.post<ItemListVmResponse>(`${this.serviceUri}/FindAll`, searchModel).pipe(
      catchError(this.handleError)
    );
  }

  save(viewModel:ItemCreateUpdateVm): Observable<ItemVmResponse>{
    if(viewModel.id == 0){
      return this.client.post<ItemVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }
    else{
      return this.client.put<ItemVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }    
  }
  delete(id: number): Observable<ItemVmResponse>{
    return this.client.delete<ItemVmResponse>(`${this.serviceUri}/${id}`).pipe(
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
