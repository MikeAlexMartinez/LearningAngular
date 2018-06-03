import { Injectable, OnInit } from '@angular/core';
import { HttpClient,
  HttpHeaders } from '@angular/common/http';
import { Employee } from '../models/employee.model';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry, delay } from 'rxjs/operators';

@Injectable()
export class FormPoster {

  constructor (private _http: HttpClient) { 
  }

  private extractData(res) {
    console.log('extracting form post response...');
    let data = res.fields || {};
    return data;
  }

  private handleError(error, observer) {
    console.error('Error!: ' + error.message);
    return throwError('oops, we encountered an error');
  }

  private extractLanguages(res) {
    console.log('extracting languages...');
    const languages = res.data.languages || [];
    return languages;
  }

  getLanguages(): Observable<any> {
    return this._http.get('http://localhost:3100/get-languages')
      .pipe(
        delay(0),
        map(this.extractLanguages),
        catchError(this.handleError)
      );
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