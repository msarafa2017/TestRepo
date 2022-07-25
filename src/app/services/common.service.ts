import { Injectable } from '@angular/core';
import { ItemLookup } from '../models/ItemLookup';
import { ToastrService } from 'ngx-toastr';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { Title } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  serviceUri:string = `${environment.Uri}Lookup`;
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json',
    'Authorization': `Bearer ${environment.Token}` })
  };
  constructor(private titleService: Title, private client:HttpClient, private toastr: ToastrService) { }

  public setTitle(newTitle: string) {
    this.titleService.setTitle('الفواتير | ' + newTitle);
  }
  
  fillActiveLookup(){
    var lookup:ItemLookup[] = [{value:true, text:'فعال'}, {value:false, text:'غير فعال'}];
    return lookup;
  }
  fillItemTypeLookup(): Observable<ItemLookup[]>{
    return this.client.get<ItemLookup[]>(`${this.serviceUri}/GetItemType`).pipe(
      catchError(this.handleError)
    );
  }
  fillItemLookup(): Observable<ItemLookup[]>{
    return this.client.get<ItemLookup[]>(`${this.serviceUri}/GetItem`).pipe(
      catchError(this.handleError)
    );
  }
  fillCustomerLookup(): Observable<ItemLookup[]>{
    return this.client.get<ItemLookup[]>(`${this.serviceUri}/GetCustomer`).pipe(
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
  // Run To Toastr
  viewMessage(ResultMsg: string): void{
    if(ResultMsg!=''){
      let res = ResultMsg.split(',');
      switch (res[0]) {
        case 'success': {
          this.toastr.success(res[2], res[1]);
            break;
        }
        case 'error': {
          this.toastr.error(res[2], res[1]);
            break;
        }
        case 'warning': {
          this.toastr.warning(res[2], res[1]);
            break;
        }
        default: {
          this.toastr.info(res[2], res[1]);
        }
      }
    }
  }


}
