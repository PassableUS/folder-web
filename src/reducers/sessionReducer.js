import * as actionTypes from 'src/actions/sessionActions';

const initialState = {
  loggedIn: !!window.localStorage.getItem('bearerToken'),
  bearerToken: window.localStorage.getItem('bearerToken'),
  user: window.localStorage.getItem('userProfile')
    ? JSON.parse(window.localStorage.getItem('userProfile'))
    : {
        firstName: 'Default',
        lastName: 'Default',
        email: 'default@default.com',
        avatar: '/images/avatars/avatar_11.png',
        bio: 'Beta tester for Folder',
        role: 'GUEST' // ['GUEST', 'USER', 'ADMIN']
      }
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SESSION_LOGIN: {
      return {
        ...state,
        loggedIn: true,
        ...action.payload
      };
    }

    case actionTypes.SESSION_LOGOUT: {
      return {
        ...state,
        loggedIn: false,
        user: {
          role: 'GUEST'
        }
      };
    }

    case actionTypes.SESSION_UPDATE: {
      return {
        ...state,
        ...action.payload
      };
    }

    default: {
      return state;
    }
  }
};

export default sessionReducer;
