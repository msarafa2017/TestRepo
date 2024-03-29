import { HttpHeaders, HttpParameterCodec, HttpParams } from '@angular/common/http';

export declare namespace Rest {
  type Config = Partial<{
    apiName: string;
    skipHandleError: boolean;
    observe: Observe;
    httpParamEncoder?: HttpParameterCodec;
  }>;
  const enum Observe {
    Body = "body",
    Events = "events",
    Response = "response"
  }
  const enum ResponseType {
    ArrayBuffer = "arraybuffer",
    Blob = "blob",
    JSON = "json",
    Text = "text"
  }
  type Params = HttpParams | {
    [param: string]: any;
  };
  interface Request<T> {
    body?: T;
    headers?: HttpHeaders | {
      [header: string]: string | string[];
    };
    method: string;
    params?: Params;
    reportProgress?: boolean;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    url: string;
    withCredentials?: boolean;
  }
}
