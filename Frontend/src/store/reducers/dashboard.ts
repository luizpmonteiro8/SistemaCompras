/* eslint-disable @typescript-eslint/no-explicit-any */
import { COUNT_DASHBOARD, SUM_DASHBOARD, TOP_DASHBOARD, IS_LOADING_DASHBOARD } from '../actions/actionTypes';
import { CountDashboardType, SumDashboard } from 'app/models/dashboard';
import { Stock } from 'app/models/stock';

const initialState = {
  count: {} as CountDashboardType,
  sum: [] as SumDashboard[],
  top: [] as Stock[],
  isLoading: false,
};

const reducer = (state = initialState, action: any) => {
  switch (action.type) {
    case COUNT_DASHBOARD:
      return {
        ...state,
        count: action.payload,
      };
    case SUM_DASHBOARD:
      return {
        ...state,
        sum: action.payload,
      };
    case TOP_DASHBOARD:
      return {
        ...state,
        top: action.payload,
      };
    case IS_LOADING_DASHBOARD:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default reducer;
