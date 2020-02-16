import { applyMiddleware, createStore, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
// import { createLogger } from 'redux-logger';
import rootReducer from 'src/reducers';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import apiMiddleware from './apiMiddleware';

// const loggerMiddleware = createLogger();
const client = axios.create({
  baseURL: 'http://localhost:3000/api',
  responseType: 'json'
})

export default function configureStore(preloadedState = {}) {
  const middlewares = [thunkMiddleware, axiosMiddleware(client), apiMiddleware]; // loggerMiddleware
  const middlewareEnhancer = composeWithDevTools(
    applyMiddleware(...middlewares)
  );

  const enhancers = [middlewareEnhancer];
  const composedEnhancers = compose(...enhancers);

  const store = createStore(rootReducer, preloadedState, composedEnhancers);

  return store;
}
