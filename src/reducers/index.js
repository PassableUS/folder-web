import { combineReducers } from 'redux';
import sessionReducer from './sessionReducer';
import pathwayReducer from './pathwayReducer';
import moduleReducer from './moduleReducer'

const rootReducer = combineReducers({
  session: sessionReducer,
  pathway: pathwayReducer,
  module: moduleReducer
});

export default rootReducer;
