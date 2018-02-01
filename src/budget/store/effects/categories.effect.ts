import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError } from "rxjs/operators";

import * as categoryActions from "../actions/categories.action";
import * as fromServices from "../../services";

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: fromServices.CategoriesService
  ) {}

  @Effect()
  loadCategories$ = this.actions$.ofType(categoryActions.LOAD_CATEGORIES).pipe(
    switchMap((action: categoryActions.LoadCategories) => {
      return this.categoriesService
        .getCategories(action.payload)
        .pipe(
          map(
            categories => new categoryActions.LoadCategoriesSuccess(categories)
          ),
          catchError(error => of(new categoryActions.LoadCategoriesFail(error)))
        );
    })
  );
}
