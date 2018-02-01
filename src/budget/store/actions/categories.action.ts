import { Action } from "@ngrx/store";

import { Category } from "../../models/category.model";

// load categories
export const LOAD_CATEGORIES = "[Dough] Load Categories";
export const LOAD_CATEGORIES_FAIL = "[Dough] Load Categories Fail";
export const LOAD_CATEGORIES_SUCCESS = "[Dough] Load Categories Success";

export const SET_CURRENT_ENTRY = "[Dough] Set Current Category";

export class LoadCategories implements Action {
  readonly type = LOAD_CATEGORIES;
  constructor(public payload: number = null) {}
}

export class LoadCategoriesFail implements Action {
  readonly type = LOAD_CATEGORIES_FAIL;
  constructor(public payload: any = null) {}
}

export class LoadCategoriesSuccess implements Action {
  readonly type = LOAD_CATEGORIES_SUCCESS;
  constructor(public payload: Category[] = null) {}
}

export class SetCurrentEntry implements Action {
  readonly type = SET_CURRENT_ENTRY;
  constructor(public payload: Category) {}
}

// action types
export type CategoriesAction =
  | LoadCategories
  | LoadCategoriesFail
  | LoadCategoriesSuccess
  | SetCurrentEntry;
