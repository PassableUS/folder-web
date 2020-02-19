import * as moduleTypes from 'src/actions/moduleActions';
import { API_START, API_END } from 'src/actions/axiosActions';

const initialState = {
  isLoadingData: false
};

const pathwayReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_MODULE: {
    //   return {
    //     ...state,
    //     data: action.payload
    //   }
    // }
    case API_START: {
      if (action.payload in moduleTypes) { // Target all payload types
        return {
          ...state,
          isLoadingData: true
        };
      }
      return state;
    }
    case API_END: {
      if (action.payload in moduleTypes) { // Target all payload types
        return {
          ...state,
          isLoadingData: false
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default pathwayReducer;
