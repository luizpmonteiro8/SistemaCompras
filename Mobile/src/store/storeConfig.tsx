import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import messageReducer from './reducers/message';
import userReducer from './reducers/user';
import categoryReducer from './reducers/category';
import productReducer from './reducers/product';
import marketReducer from './reducers/market';
import purchasesReducer from './reducers/purchases';
import stockReducer from './reducers/stock';
import entraceExitReducer from './reducers/entraceexit';
import dashboardReducer from './reducers/dashboard';

const reducers = combineReducers({
  message: messageReducer,
  user: userReducer,
  category: categoryReducer,
  product: productReducer,
  market: marketReducer,
  purchases: purchasesReducer,
  stock: stockReducer,
  entraceExit: entraceExitReducer,
  dashboard: dashboardReducer,
});

const storeConfig = () => {
  return createStore(reducers, compose(applyMiddleware(thunk)));
};

export default storeConfig;
