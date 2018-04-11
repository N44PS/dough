import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError, withLatestFrom } from "rxjs/operators";

import * as categoriesActions from "../actions/categories.action";
import * as UiActions from "../actions/ui.action";
import * as fromServices from "../../services";
import * as fromReducers from "../reducers";

@Injectable()
export class CategoriesEffects {
  constructor(
    private actions$: Actions,
    private categoriesService: fromServices.CategoriesService,
    private store$: Store<fromReducers.BudgetState>
  ) {}

  @Effect()
  loadCategories$ = this.actions$
    .ofType(categoriesActions.LOAD_CATEGORIES)
    .pipe(
      switchMap((action: categoriesActions.LoadCategories) => {
        return this.categoriesService
          .getCategories(action.payload)
          .pipe(
            map(
              categories =>
                new categoriesActions.LoadCategoriesSuccess(categories)
            ),
            catchError(error =>
              of(new categoriesActions.LoadCategoriesFail(error))
            )
          );
      })
    );

  @Effect()
  updateCategories = this.actions$
    .ofType(categoriesActions.RELOAD_CATEGORIES)
    .pipe(
      switchMap((action: categoriesActions.LoadCategories) => {
        return this.categoriesService
          .getCategories(action.payload)
          .pipe(
            switchMap(categories => [
              new categoriesActions.LoadCategoriesSuccess(categories),
              new categoriesActions.UpdateEntrySuccess(),
              new UiActions.toggleModalState()
            ]),
            catchError(error =>
              of(new categoriesActions.LoadCategoriesFail(error))
            )
          );
      })
    );

  @Effect()
  updateEntry$ = this.actions$.ofType(categoriesActions.UPDATE_ENTRY).pipe(
    map((action: categoriesActions.ReloadCategories) => action.payload),
    withLatestFrom(
      this.store$.select(fromReducers.getCurrentEntry),
      this.store$.select(fromReducers.getEntryMode),
      this.store$.select(fromReducers.getCurrentMonth)
    ),
    switchMap(([action, currentEntry, mode, month]) => {
      return this.categoriesService
        .updateEntry(currentEntry.id, action, mode)
        .pipe(
          switchMap(entry => [
            new categoriesActions.ReloadCategories(month.id)
          ]),
          catchError(error => of(new categoriesActions.UpdateEntryFail(error)))
        );
    })
  );
}
