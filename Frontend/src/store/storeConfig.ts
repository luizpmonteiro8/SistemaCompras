import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import marketReducer from './reducers/market';
import categoryReducer from './reducers/category';
import productReducer from './reducers/product';
import purchasesReducer from './reducers/purchases';
import entraceExitReducer from './reducers/entraceexit';
import stockReducer from './reducers/stock';
import dashboardReducer from './reducers/dashboard';

const reducers = combineReducers({
  market: marketReducer,
  category: categoryReducer,
  product: productReducer,
  purchases: purchasesReducer,
  entraceExit: entraceExitReducer,
  stock: stockReducer,
  dashboard: dashboardReducer,
});

const storeConfig = createStore(reducers, compose(applyMiddleware(thunk)));
export default storeConfig;
