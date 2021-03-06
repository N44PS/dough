import * as fromCategories from "../actions/categories.action";
import { Category } from "../../models/category.model";
import { Entry } from "../../models/entry.model";

export interface CategoryState {
  entities: { [id: number]: Category };
  currentEntry: Entry;
  totalIncome: number;
  totalExpenses: number;
  netIncome: number;
  balance: number;
  loaded: boolean;
  loading: boolean;
}

export const initialState: CategoryState = {
  entities: {},
  currentEntry: {},
  totalIncome: 0,
  totalExpenses: 0,
  netIncome: 0,
  balance: 0,
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromCategories.CategoriesAction
): CategoryState {
  switch (action.type) {
    case fromCategories.LOAD_CATEGORIES: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCategories.LOAD_CATEGORIES_SUCCESS: {
      const {
        categories,
        totalExpenses,
        netIncome,
        balance,
        totalIncome
      } = action.payload;
      const entities = categories.reduce(
        (entities: { [id: number]: Category }, category: Category) => {
          return {
            ...entities,
            [category.id]: category
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        totalExpenses,
        netIncome,
        balance,
        totalIncome,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromCategories.LOAD_CATEGORIES_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromCategories.SET_CURRENT_ENTRY: {
      const currentEntry = action.payload;
      return {
        ...state,
        currentEntry
      };
    }

    case fromCategories.UPDATE_ENTRY: {
      return {
        ...state,
        loading: true
      };
    }

    case fromCategories.UPDATE_ENTRY_SUCCESS: {
      return { ...state, currentEntry: {}, loaded: true };
    }

    case fromCategories.UPDATE_ENTRY_FAIL: {
      return {
        ...state,
        loading: false
      };
    }
  }

  return state;
}

export const getCategoriesEntities = (state: CategoryState) => state.entities;
export const getCategoriesLoading = (state: CategoryState) => state.loading;
export const getCategoriesLoaded = (state: CategoryState) => state.loaded;
