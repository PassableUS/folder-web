import * as pathwayTypes from 'src/actions/pathwayActions';
import { API_START, API_END } from 'src/actions/axiosActions';

const initialState = {
  isLoadingData: false
};

const pathwayReducer = (state = initialState, action) => {
  switch (action.type) {
    // case SET_PATHWAY: {
    //   return {
    //     ...state,
    //     data: action.payload
    //   }
    // }
    case API_START: {
      if (action.payload in pathwayTypes) { // Target all payload types
        return {
          ...state,
          isLoadingData: true
        };
      }
      return state;
    }
    case API_END: {
      if (action.payload in pathwayTypes) { // Target all payload types
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
