import axios from 'axios';
import { apiAction } from './axiosActions';

export const UPDATE_USER_MODAL = 'UPDATE_USER_MODAL';
export const FETCH_USER = 'FETCH_USER';

export const getUserData = (userId, onSuccess, onFailure) => async dispatch => {
  dispatch(
    apiAction({
      url: `/users/${userId}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_USER,
    })
  );
};

export const updateUserModals = (userId, updateObject, onSuccess, onFailure) => async dispatch => {
  dispatch(
    apiAction({
      url: '/users/modalssetup',
      method: 'PUT',
      data: {
        id: userId,
        ...updateObject
      },
      onSuccess, // Passed in
      onFailure, // Passed in
      label: UPDATE_USER_MODAL,
    })
  );
};
