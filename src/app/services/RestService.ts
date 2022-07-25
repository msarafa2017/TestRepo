import { HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rest } from './Rest';

export declare class RestService {

  request<T, R>(request: HttpRequest<T> | Rest.Request<T>, config?: Rest.Config, api?: string): Observable<R>;
}
