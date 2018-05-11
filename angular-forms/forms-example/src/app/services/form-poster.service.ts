import { Injectable } from '@angular/core';
import { HttpClient,
  HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';

@Injectable()
export class FormPoster {

  constructor (private _http: HttpClient) { 
  }

  private extractData(res) {
    console.log('map called');
    let data = res.fields || {};
    return data;
  }

  private handleError(error, observer) {
    console.error('Error!: ' + error.message);
    return throwError('oops, we encountered an error');
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
      .pipe(
        map(this.extractData),
        catchError(this.handleError)
      );
  }
}