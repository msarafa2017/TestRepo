import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retryWhen } from 'rxjs';
import { retry, delay, tap } from 'rxjs';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BillDetailVm, BillDetailVmResponse, BillItemListResponse, BillItemListVmResponse, BillMainCreateUpdateVm, BillMainListVmResponse, BillMainUpdateVm, BillMainUpdateVmResponse, BillMainVmResponse, BillSm } from '../models/BillListVm';

@Injectable({
  providedIn: 'root'
})
export class BillService {
  serviceUri:string = `${environment.Uri}Bill`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.Token}` })
  };

  constructor(private client:HttpClient) { }
  
  getById(id:number): Observable<BillMainVmResponse>{
    return this.client.get<BillMainVmResponse>(`${this.serviceUri}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  search(searchModel:BillSm): Observable<BillMainListVmResponse>{
    return this.client.post<BillMainListVmResponse>(`${this.serviceUri}/FindAll`, searchModel).pipe(
      //catchError(this.handleError), retry(2)
      catchError(this.handleError), retryWhen(err => err.pipe(
                                                            tap(() => console.log("error occurred")),
                                                            delay(2000),
                                                            tap(() => console.log("Retrying... "))
                                                            ))
    );
  }

  save(viewModel: BillMainCreateUpdateVm): Observable<BillMainVmResponse>{
    if (viewModel.id == undefined || viewModel.id == 0) {
      return this.client.post<BillMainVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }
    else{
      return this.client.put<BillMainVmResponse>(this.serviceUri, viewModel).pipe(
        catchError(this.handleError)
      );
    }    
  }
  updateBill(viewModel: BillMainUpdateVm): Observable<BillMainUpdateVmResponse>{
    return this.client.put<BillMainUpdateVmResponse>(`${this.serviceUri}/UpdateBill`, viewModel).pipe(
      catchError(this.handleError)
    );
  }

  getBillItems(id:number): Observable<BillItemListResponse>{
    return this.client.get<BillItemListResponse>(`${this.serviceUri}/GetBillItems/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  addDetails(viewModel:BillDetailVm): Observable<BillDetailVmResponse>{
    return this.client.post<BillDetailVmResponse>(`${this.serviceUri}/AddDetails`, viewModel).pipe(
      catchError(this.handleError)
    );
  }
  deleteDetails(id:number): Observable<BillMainVmResponse>{
    return this.client.delete<BillMainVmResponse>(`${this.serviceUri}/DeleteDetails/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  billDetails(id:number): Observable<BillItemListVmResponse>{
    return this.client.get<BillItemListVmResponse>(`${this.serviceUri}/BillDetails/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  delete(id: number): Observable<BillMainVmResponse>{
    return this.client.delete<BillMainVmResponse>(`${this.serviceUri}/${id}`).pipe(
      catchError(this.handleError)
    );
  }
  



  getItemPrice(id:number): Observable<number>{
    return this.client.get<number>(`${this.serviceUri}/GetItemPrice/${id}`).pipe(
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
