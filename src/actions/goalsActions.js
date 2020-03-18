import { apiAction } from './axiosActions';

export const CREATE_GOALS = 'CREATE_GOALS';
export const FETCH_CALENDAREVENT = 'FETCH_CALENDAREVENT';
export const FETCH_GOALS = 'FETCH_GOALS';

export const createGoals = (goals, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: '/goals',
      method: 'POST',
      data: goals,
      onSuccess, // Passed in
      onFailure, // Passed in
      label: CREATE_GOALS
    })
  );
};

export const fetchGoalsByPathway = (pathwayId, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/goals/${pathwayId}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_CALENDAREVENT
    })
  );
};

export const fetchGoalsByCourse = (moduleId, courseURL, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/goals/course/${moduleId}/${courseURL}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_GOALS
    })
  );
};

export const fetchGoalsByWeek = (startDate, endDate, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/goals/week/${startDate}/${endDate}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_GOALS
    })
  );
};

// export const addModuleToCalendarEvent = (moduleId, pathwayId, onFailure, onSuccess) => async (dispatch, getState) => {
//   dispatch(
//     apiAction({
//       url: `/goals/${pathwayId}`,
//       method: 'PUT',
//       data: {
//         moduleId
//       },
//       onSuccess, // Passed in
//       onFailure, // Passed in
//       label: FETCH_GOALS
//     })
//   );
// };
