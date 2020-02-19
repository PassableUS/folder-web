import * as actionTypes from 'src/actions/axiosActions';

const initialState = {
  showWarning: false,
  error: null
};

const axiosReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACCESS_DENIED: {
      return {
        ...state,
        showWarning: true,
        ...action.payload
      };
    }

    case actionTypes.DISMISS_WARNING: {
      return {
        ...state,
        showWarning: false
      };
    }

    default: {
      return state;
    }
  }
};

export default axiosReducer;
