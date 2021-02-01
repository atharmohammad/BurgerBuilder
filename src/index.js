import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import {createStore,applyMiddleware,compose,combineReducers} from 'redux';
import burgerBuilderReducer from './store/Reducers/BurgerBuilder';
import thunk from 'redux-thunk';
import orderReducer from './store/Reducers/Order';
import authReducer from './store/Reducers/Auth';
//Create Store here
const rootReducer = combineReducers({
  ing : burgerBuilderReducer,
  ord : orderReducer,
  auth:authReducer
})

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
export const store = createStore(rootReducer
  ,composeEnhancers(applyMiddleware(thunk)));


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
