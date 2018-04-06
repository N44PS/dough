import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, withLatestFrom } from "rxjs/operators";

import * as categoryActions from "../actions/categories.action";
import * as fromServices from "../../services";
import * as fromReducers from "../reducers";

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: fromServices.CategoriesService,
    private store$: Store<fromReducers.BudgetState>
  ) { }

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


  // GET STORE VALUE TO PROPERLY CALL SERVICE & UPDATE ENTRY
  @Effect()
  updateEntry$ = this.actions$.ofType(categoryActions.UPDATE_ENTRY).pipe(
    withLatestFrom(this.store$.select(fromReducers.getCurrentEntry)),
    withLatestFrom(this.store$.select(fromReducers.getEntryMode),
      ([action, currentEntry], mode) => {
        return new Array([action, currentEntry, mode]);
      }),
    switchMap(([action, currentEntry, mode]) => {
      console.log("updateEntry", action, currentEntry.id, mode);
      return this.categoriesService
        .updateEntry(currentEntry.id, action.payload, mode)
        .pipe(
        map(
          entry => new categoryActions.UpdateEntrySuccess(entry)
        ),
        catchError(error => of(new categoryActions.UpdateEntryFail(error)))
        );
    })
  )
}
