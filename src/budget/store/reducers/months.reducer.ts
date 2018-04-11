import * as fromMonths from "../actions/months.action";
import { Month } from "../../models/month.model";

export interface MonthState {
  entities: { [id: number]: Month };
  currentMonth: Month;
  loaded: boolean;
  loading: boolean;
}

export const initialState: MonthState = {
  entities: {},
  currentMonth: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromMonths.MonthsAction
): MonthState {
  switch (action.type) {
    case fromMonths.LOAD_MONTHS: {
      return {
        ...state,
        loading: true
      };
    }

    case fromMonths.SET_CURRENT_MONTH: {
      return {
        ...state,
        currentMonth: action.payload
      };
    }

    case fromMonths.LOAD_MONTHS_SUCCESS: {
      const Months = action.payload;

      const entities = Months.reduce(
        (entities: { [id: number]: Month }, month: Month) => {
          return {
            ...entities,
            [month.id]: month
          };
        },
        {
          ...state.entities
        }
      );

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }

    case fromMonths.LOAD_MONTHS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }
  }

  return state;
}

export const getCurrentMonth = (state: MonthState) => state.currentMonth;
export const getNextMonth = (state: MonthState) => {
  const months = <Month[]>Object.values(state.entities);
  const nextMonth = months.find(
    month => month.id === state.currentMonth.id + 1
  );
  return nextMonth;
};
export const getPrevMonth = (state: MonthState) => {
  const months = <Month[]>Object.values(state.entities);
  const prevMonth = months.find(
    month => month.id === state.currentMonth.id - 1
  );
  return prevMonth;
};
export const getMonthsEntities = (state: MonthState) => state.entities;
export const getMonthsLoading = (state: MonthState) => state.loading;
export const getMonthsLoaded = (state: MonthState) => state.loaded;
