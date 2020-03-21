import { apiAction } from './axiosActions';

export const CREATE_GOALS = 'CREATE_GOALS';
export const FETCH_GOALS_BY_WEEK = 'FETCH_GOALS_BY_WEEK';
export const FETCH_GOALS_BY_COURSE = 'FETCH_GOALS_BY_COURSE';
export const FETCH_GOALS_BY_PATHWAY = 'FETCH_GOALS_BY_PATHWAY';

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
      url: `/goals/pathway/${pathwayId}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_GOALS_BY_PATHWAY
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
      label: FETCH_GOALS_BY_COURSE
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
      label: FETCH_GOALS_BY_WEEK
    })
  );
};
