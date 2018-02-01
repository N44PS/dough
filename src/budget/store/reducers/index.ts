import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";

import * as fromCategories from "./categories.reducer";
import * as fromMonths from "./months.reducer";

export interface BudgetState {
  categories: fromCategories.CategoryState;
  months: fromMonths.MonthState;
}

export const reducers: ActionReducerMap<BudgetState> = {
  categories: fromCategories.reducer,
  months: fromMonths.reducer
};

export const getBudgetState = createFeatureSelector<BudgetState>("budget");

// categories state
export const getCategoryState = createSelector(
  getBudgetState,
  (state: BudgetState) => state.categories
);

export const getMonthState = createSelector(
  getBudgetState,
  (state: BudgetState) => state.months
);

export const getCategoriesEntities = createSelector(
  getCategoryState,
  fromCategories.getCategoriesEntities
);

export const getMonthsEntities = createSelector(
  getMonthState,
  fromMonths.getMonthsEntities
);

export const getAllCategories = createSelector(
  getCategoriesEntities,
  entities => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
  }
);

export const getCurrentMonth = createSelector(
  getMonthState,
  fromMonths.getCurrentMonth
);

export const getAllMonths = createSelector(getMonthsEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getCategoriesLoaded = createSelector(
  getCategoryState,
  fromCategories.getCategoriesLoaded
);

export const getCategoriesLoading = createSelector(
  getCategoryState,
  fromCategories.getCategoriesLoading
);

export const getMonthsLoaded = createSelector(
  getMonthState,
  fromMonths.getMonthsLoaded
);

export const getMonthsLoading = createSelector(
  getMonthState,
  fromMonths.getMonthsLoading
);
