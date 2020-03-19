import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import pathwayReducer from './pathwayReducer';
import moduleReducer from './moduleReducer';
import axiosReducer from './axiosReducer';
import noteReducer from './noteReducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  pathway: pathwayReducer,
  module: moduleReducer,
  axios: axiosReducer,
  notes: noteReducer
});

export default rootReducer;
