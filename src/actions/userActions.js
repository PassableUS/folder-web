import axios from 'axios';
import { apiAction } from './axiosActions';

export const UPDATE_USER_MODAL = 'UPDATE_USER_MODAL';
export const FETCH_USER = 'FETCH_USER';

export const getUserData = (onSuccess, onFailure) => async dispatch => {
  dispatch(
    apiAction({
      url: `/users/user`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_USER
    })
  );
};

export const updateUserModals = (
  updateObject,
  onSuccess,
  onFailure
) => async dispatch => {
  dispatch(
    apiAction({
      url: '/users/modalssetup',
      method: 'PUT',
      data: updateObject,
      onSuccess, // Passed in
      onFailure, // Passed in
      label: UPDATE_USER_MODAL
    })
  );
};
