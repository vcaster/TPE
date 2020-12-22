import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import { BrowserRouter } from 'react-router-dom'
import HttpsRedirect from 'react-https-redirect';

// redux addons

import { Provider } from 'react-redux'
import { createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

import Reducer from './reducers'

const createStoreWithMiddleware = applyMiddleware(promiseMiddleware,ReduxThunk)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(Reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
    <HttpsRedirect>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </HttpsRedirect>
  </Provider>,
  document.getElementById('root')
);
