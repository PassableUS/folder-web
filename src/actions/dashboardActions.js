import { apiAction } from './axiosActions'

export const CREATE_TODO = 'CREATE_TODO';
export const FETCH_TODOS = 'FETCH_TODOS';

export const createTodo = (todoInformation, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(apiAction({
      url: '/todos',
      method: 'POST',
      data: todoInformation,
      onSuccess, // Passed in
      onFailure, // Passed in
      label: CREATE_TODO
    })
  )
}

export const fetchTodos = (onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/todos`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_TODOS
    })
  )
}
