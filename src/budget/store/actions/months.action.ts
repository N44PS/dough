import { Action } from "@ngrx/store";

import { Month } from "../../models/month.model";

// load pizzas
export const LOAD_MONTHS = "[Dough] Load Months";
export const LOAD_MONTHS_FAIL = "[Dough] Load Months Fail";
export const LOAD_MONTHS_SUCCESS = "[Dough] Load Months Success";
export const SET_CURRENT_MONTH = "[Dough] Set Current Month";

export class SetCurrentMonth implements Action {
  readonly type = SET_CURRENT_MONTH;
  constructor(public payload: Month) {}
}

export class LoadMonths implements Action {
  readonly type = LOAD_MONTHS;
}

export class LoadMonthsFail implements Action {
  readonly type = LOAD_MONTHS_FAIL;
  constructor(public payload: any) {}
}

export class LoadMonthsSuccess implements Action {
  readonly type = LOAD_MONTHS_SUCCESS;
  constructor(public payload: Month[]) {}
}

// action types
export type MonthsAction =
  | LoadMonths
  | LoadMonthsFail
  | LoadMonthsSuccess
  | SetCurrentMonth;
