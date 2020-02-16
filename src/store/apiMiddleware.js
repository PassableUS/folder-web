import axios from "axios";
import { API, accessDenied, apiError, apiStart, apiSuccess, apiEnd } from "src/actions/axiosActions";

const apiMiddleware = ({ dispatch, getState }) => next => action => { // Middleware setup
  next(action); // Pass action along

  if (action.type !== API) return; // Prevent any other actions other than API requests from triggering network requests

  const {
    url, // Endpoint to make request to
    method, // HTTP method
    data, // Data (POST OR PUT) | query parameter (GET or DELETE)
    bearerToken = getState().session.bearerToken, // Authentication token override
    onSuccess, // Action creator dispatched on success
    onFailure, // Action creator dispatched on failure
    label, // String representation of request
    headers // Custom headers for request
  } = action.payload;

  // Gets the appropriate key for the axios request dependent on method (see `data` above)
  const dataOrParams = ["GET", "DELETE"].includes(method) ? "params" : "data";

  // axios default configs
  if (!process.env.REACT_APP_API_BASE_URL) {
    console.log('Warning: BASE_URL not defined, please specify base API URL')
  }
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || "";
  axios.defaults.headers.common["Content-Type"] = "application/json";
  axios.defaults.headers.common["Authorization"] = bearerToken;

  // Dispatches API_START action with label as payload to be received by a reducer
  if (label) {
    dispatch(apiStart(label)); 
  }

  axios
    .request({
      url,
      method,
      headers,
      [dataOrParams]: data
    })
    .then(({ data }) => {
      // Dispatches API_SUCCESS action with label as payload to be received by a reducer
      dispatch(apiSuccess(label))
      // Executes the success callback function with the label
      onSuccess(data);
    })
    .catch(error => {
      // Dispatches API_ERROR action with error as payload
      dispatch(apiError(error));
      // Executes the failure callback function with the error
      onFailure(error);

      if (error.response && error.response.status === 401) {
        // Dispatches ACCESS_DENIED action with URL as payload
        alert('Unauthorized access token. Sign in again?')
        dispatch(accessDenied(window.location.pathname));
      }
    })
    .finally(() => {
      // Dispatches API_END action with label as payload
      if (label) {
        dispatch(apiEnd(label));
      }
    });
};

export default apiMiddleware;