import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs/Observable";
import { catchError } from "rxjs/operators";
import "rxjs/add/observable/throw";

import { Category } from "../models/category.model";

import { environment } from "../../environments/environment";

@Injectable()
export class CategoriesService {
  constructor(private http: HttpClient) {}

  getCategories(monthId: number): Observable<Category[]> {
    return this.http
      .get<Category[]>(`${environment.apiUrl}/cells/${monthId}`)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }

  updateCategory(payload: Category): Observable<Category> {
    return this.http
      .put<Category>(`${environment.apiUrl}/cells/${payload.id}`, payload)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
  }
}
