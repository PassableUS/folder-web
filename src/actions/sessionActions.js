import axios from 'axios';
import { apiAction } from './axiosActions';

export const SESSION_LOGIN = 'SESSION_LOGIN';
export const SESSION_LOGOUT = 'SESSION_LOGOUT';
export const SESSION_REGISTER = 'SESSION_REGISTER';

export const register = (userInfo, onFailure, onSuccess) => async (dispatch) => {
  dispatch(
    apiAction({
      url: '/authentication/local/start',
      method: 'POST',
      data: userInfo,
      onSuccess, // Passed in
      onFailure, // Passed in
      label: SESSION_REGISTER
    })
  );
};

export const login = (token) => async (dispatch) => {
  const bearerToken = `bearer ${token}`;
  const config = {
    headers: { Authorization: bearerToken },
  };

  const user = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/users/profile`, config).then((user) => user.data);

  window.localStorage.setItem('bearerToken', bearerToken);
  window.localStorage.setItem('userProfile', JSON.stringify(user));

  // Dispatches user information + token to store
  dispatch({
    type: SESSION_LOGIN,
    payload: {
      bearerToken,
      user
    }
  });
};

export const logout = () => (dispatch) => {
  window.localStorage.removeItem('bearerToken');
  window.localStorage.removeItem('userProfile');

  // Dispatches action to logout
  dispatch({
    type: SESSION_LOGOUT
  });
};
