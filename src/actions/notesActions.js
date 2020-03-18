import { apiAction } from './axiosActions';

export const CREATE_DRAWING = 'CREATE_DRAWING';
export const CREATE_TEXT_NOTE = 'CREATE_TEXT_NOTE';
export const FETCH_NOTE = 'FETCH_NOTE';
export const FETCH_NOTES = 'FETCH_NOTES';

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
  // const onSuccess = data => {
  //   dispatch({
  //     type:
  //   })
  // }

  dispatch(
    apiAction({
      url: '/notes',
      method: 'GET',
      onSuccess,
      onFailure,
      label: FETCH_NOTES
    })
  );
};
