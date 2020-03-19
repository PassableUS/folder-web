import { apiAction } from './axiosActions';

export const CREATE_DRAWING = 'CREATE_DRAWING';
export const CREATE_TEXT_NOTE = 'CREATE_TEXT_NOTE';
export const FETCH_NOTE = 'FETCH_NOTE';
export const FETCH_NOTES = 'FETCH_NOTES';
export const RECEIVED_NOTES = 'RECEIVED_NOTES';

export const createTextNote = (
  noteData,
  onFailure,
  onSuccess
) => async dispatch => {
  dispatch(
    apiAction({
      url: '/notes',
      method: 'POST',
      data: noteData,
      onSuccess,
      onFailure,
      label: CREATE_TEXT_NOTE
    })
  );
};

export const fetchNotes = (onFailure, onSuccess) => async dispatch => {
  const derivedOnSuccess = data => {
    dispatch({
      type: RECEIVED_NOTES,
      payload: data
    });

    onSuccess();
  };

  dispatch(
    apiAction({
      url: '/notes',
      method: 'GET',
      onSuccess: derivedOnSuccess,
      onFailure,
      label: FETCH_NOTES
    })
  );
};
