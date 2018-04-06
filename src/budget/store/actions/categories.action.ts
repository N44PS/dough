import { Action } from "@ngrx/store";

import { Category } from "../../models/category.model";
import { Entry } from "../../models/entry.model";

// load categories
export const LOAD_CATEGORIES = "[Dough] Load Categories";
export const LOAD_CATEGORIES_FAIL = "[Dough] Load Categories Fail";
export const LOAD_CATEGORIES_SUCCESS = "[Dough] Load Categories Success";

export const SET_CURRENT_ENTRY = "[Dough] Set Current Entry";
export const UPDATE_ENTRY = "[Dough] Update Entry";
export const UPDATE_ENTRY_SUCCESS = "[Dough] Update Entry Success";
export const UPDATE_ENTRY_FAIL = "[Dough] Update Entry Fail";

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
  constructor(public payload: number = null) { }
}

export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any = null) { }
}

export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;
  constructor(
    public payload: { categories: Category[]; totalExpenses: number } = null
  ) { }
}

export class SetCurrentEntry implements Action {
  readonly type = SET_CURRENT_ENTRY;
  constructor(public payload: Entry) { }
}

export class UpdateEntry implements Action {
  readonly type = UPDATE_ENTRY;
  constructor(public payload: { value: number }) { }
}

export class UpdateEntrySuccess implements Action {
  readonly type = UPDATE_ENTRY_SUCCESS;
  constructor(public payload: Entry) { }
}

export class UpdateEntryFail implements Action {
  readonly type = UPDATE_ENTRY_FAIL;
  constructor(public payload: any = null) { }
}

// action types
export type CategoriesAction =
  | LoadCategories
  | UpdateEntry
  | LoadCategories
  | LoadCategoriesFail
  | UpdateEntryFail
  | UpdateEntrySuccess
  | LoadCategoriesSuccess
  | SetCurrentEntry;
