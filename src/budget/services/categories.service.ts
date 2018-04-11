import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { Category } from "../models/category.model";
import { Entry } from "../models/entry.model";

import { environment } from "../../environments/environment";

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(
    monthId: number
  ): Observable<{
    categories: Category[];
    totalIncome: number;
    totalExpenses: number;
    netIncome: number;
    balance: number;
  }> {
    return this.http
      .get(`${environment.apiUrl}/cells/${monthId}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateEntry(
    batchId: string,
    value: number,
    method: string
  ): Observable<Entry> {
    return this.http
      .put(`${environment.apiUrl}/cell/${batchId}`, { value, method })
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
