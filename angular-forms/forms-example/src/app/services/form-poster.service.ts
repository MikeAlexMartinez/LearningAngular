import { Injectable } from '@angular/core';
import { HttpClient,
  HttpResponse,
  HttpHeaderResponse,
  HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable()
export class FormPoster {

  constructor (private _http: HttpClient) { 
  }

  private extractData(res: HttpResponse<any>) {
    let body = JSON.parse(res.body);
    return body.fields || { };
  }

  private handleError(error: any) {
    console.error('post error: ', error);
    return Observable.throw(error.statusText);
  }

  postEmployeeForm(employee: Employee) {
    let body = JSON.stringify(employee);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }


    return this._http.post<any>('http://localhost:3100/postemployee', body, httpOptions)
      .pipe(map(res => {
        console.log(res);
        return res;
      }));
  }
}