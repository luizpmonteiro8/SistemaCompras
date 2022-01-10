/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  COUNT_DASHBOARD,
  SUM_DASHBOARD,
  TOP_DASHBOARD,
  IS_LOADING_DASHBOARD,
} from './actionTypes';
import { useDashboardService } from './../../app/services/dashboard.service';

let returnValue = false;

export const CountDashboard = () => {
  const dashboardService = useDashboardService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await dashboardService
      .count()
      .then((res) => {
        dispatch({ type: COUNT_DASHBOARD, payload: res });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const SumDashboard = () => {
  const dashboardService = useDashboardService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await dashboardService
      .sum()
      .then((res) => {
        dispatch({ type: SUM_DASHBOARD, payload: res });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

export const TopDashboard = () => {
  const dashboardService = useDashboardService();
  return async (dispatch: any) => {
    dispatch(isLoading(true));
    await dashboardService
      .quantity()
      .then((res) => {
        dispatch({ type: TOP_DASHBOARD, payload: res });
        returnValue = true;
      })
      .catch((err) => {
        dispatch(isLoading(false));
        if (String(err.message).includes('Network Error')) {
          throw new Error('Não foi possivel conectar com servidor.');
        } else {
          throw new Error(err.response.data.message);
        }
      });
    dispatch(isLoading(false));
    return returnValue;
  };
};

const isLoading = (value: boolean) => {
  return { type: IS_LOADING_DASHBOARD, payload: value };
};
