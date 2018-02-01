import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { Month } from "../models/month.model";

import { environment } from "../../environments/environment";

@Injectable()
export class MonthsService {
  constructor(private http: HttpClient) {}

  getMonths(): Observable<Month[]> {
    return this.http
      .get<Month[]>(`${environment.apiUrl}/months`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
