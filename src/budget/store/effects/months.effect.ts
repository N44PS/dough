import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, switchMap, catchError } from "rxjs/operators";

import * as monthsAction from "../actions/months.action";
import * as categoriesAction from "../actions/categories.action";
import * as fromServices from "../../services";

import { Month } from "../../models/month.model";

@Injectable()
export class MonthsEffects {
  constructor(
    private actions$: Actions,
    private MonthsService: fromServices.MonthsService
  ) {}

  @Effect()
  loadMonths$ = this.actions$.ofType(monthsAction.LOAD_MONTHS).pipe(
    switchMap(() => {
      return this.MonthsService.getMonths().pipe(
        switchMap(months => {
          const currentMonth = new Date().getMonth();
          return [
            new monthsAction.LoadMonthsSuccess(months),
            new monthsAction.SetCurrentMonth(months[currentMonth])
          ];
        }),
        catchError(error => of(new monthsAction.LoadMonthsFail(error)))
      );
    })
  );

  @Effect()
  setCurrentMonth$ = this.actions$
    .ofType(monthsAction.SET_CURRENT_MONTH)
    .pipe(
      map((action: monthsAction.SetCurrentMonth) => action.payload),
      map((payload: Month) => new categoriesAction.LoadCategories(payload.id))
    );
}
