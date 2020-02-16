export const FETCH_ARTICLE_DETAILS = "FETCH_ARTICLE_DETAILS";
export const SET_ARTICLE_DETAILS = "SET_ARTICLE_DETAILS";

export const API = "API";
export const API_START = "API_START";
export const API_END = "API_END";
export const ACCESS_DENIED = "ACCESS_DENIED";
export const API_ERROR = "API_ERROR";
export const API_SUCCESS = "API_SUCCESS";

export const apiStart = label => ({
  type: API_START,
  payload: label
});

export const apiEnd = label => ({
  type: API_END,
  payload: label
});

export const accessDenied = url => ({
  type: ACCESS_DENIED,
  payload: {
    url
  }
});

export const apiError = error => ({
  type: API_ERROR,
  error
});

export const apiSuccess = label => ({
  type: API_SUCCESS,
  payload: label
});

// Action creator that takes advantage of the apiMiddleware with the "API" action.type
// The "apiMiddleware" middleware makes use of the above action creators
// We set the below defaults, so every value does not need to be filled
export const apiAction = ({
  url,
  method = "GET",
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  label
}) => {
  return {
    type: API,
    payload: {
      url,
      method,
      data,
      onSuccess,
      onFailure,
      label
    }
  };
}