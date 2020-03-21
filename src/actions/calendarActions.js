import { apiAction } from './axiosActions';

export const CREATE_CALENDAREVENTS = 'CREATE_CALENDAREVENTS';
export const FETCH_CALENDAREVENTS = 'FETCH_CALENDAREVENTS';

export const createCalendarEvents = (calendarEvents, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: '/calendar',
      method: 'POST',
      data: { 
        calendarEvents
      },
      onSuccess, // Passed in
      onFailure, // Passed in
      label: CREATE_CALENDAREVENTS
    })
  );
};

export const fetchCalendarEvents = (onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/calendar`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_CALENDAREVENTS
    })
  );
};
