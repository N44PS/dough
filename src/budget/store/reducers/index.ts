import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector
} from "@ngrx/store";

import * as fromCategories from "./categories.reducer";
import * as fromMonths from "./months.reducer";
import * as fromUI from "./ui.reducer";

export interface BudgetState {
  categories: fromCategories.CategoryState;
  months: fromMonths.MonthState;
  ui: fromUI.UIState;
}

export const reducers: ActionReducerMap<BudgetState> = {
  categories: fromCategories.reducer,
  months: fromMonths.reducer,
  ui: fromUI.reducer
};

export const getBudgetState = createFeatureSelector<BudgetState>("budget");

// categories state
export const getUIState = createSelector(
  getBudgetState,
  (state: BudgetState) => state.ui
);

export const getModalState = createSelector(
  getUIState,
  (state: fromUI.UIState) => state.modalIsOpen
);

export const getEntryMode = createSelector(
  getUIState,
  (state: fromUI.UIState) => state.mode
);

export const getCategoryState = createSelector(
  getBudgetState,
  (state: BudgetState) => state.categories
);

export const isCategoriesLoading = createSelector(
  getBudgetState,
  (state: BudgetState) => state.categories.loading
);

export const getCurrentEntry = createSelector(
  getCategoryState,
  (state: fromCategories.CategoryState) => state.currentEntry
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

export const getStatus = createSelector(
  getCategoryState,
  ({
    totalIncome,
    totalExpenses,
    netIncome,
    balance
  }: fromCategories.CategoryState) => ({
    totalIncome,
    totalExpenses,
    netIncome,
    balance
  })
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

export const getNextMonth = createSelector(
  getMonthState,
  fromMonths.getNextMonth
);

export const getPrevMonth = createSelector(
  getMonthState,
  fromMonths.getPrevMonth
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
