import { apiAction } from './axiosActions';

export const CREATE_CALENDAREVENTS = 'CREATE_CALENDAREVENTS';
export const FETCH_CALENDAREVENT = 'FETCH_CALENDAREVENT';
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

export const fetchCalendarEvent = (pathwayId, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/calendar/${pathwayId}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_CALENDAREVENT
    })
  );
};

export const fetchCalendarEvents = (onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: '/calendar',
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_CALENDAREVENTS
    })
  );
};
