import * as noteTypes from 'src/actions/noteActions';
import { API_START, API_END } from 'src/actions/axiosActions';

const initialState = {
  isLoadingData: false,
  noteData: null
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case noteTypes.RECEIVED_NOTES: {
      return {
        ...state,
        noteData: action.payload
      };
    }
    case API_START: {
      if (action.payload in noteTypes) {
        // Target all payload types
        return {
          ...state,
          isLoadingData: true
        };
      }
      return state;
    }
    case API_END: {
      if (action.payload in noteTypes) {
        // Target all payload types
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

export default noteReducer;
