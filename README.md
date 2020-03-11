 [TOC]

# Folder Web Client

Web client hosted at https://folder.me (consumes `folder-api` hosted at `api.folder.me`)

## Installation

1. Navigate to the root directory
2. Run `npm install`
3. Proceed to [Configuration](#Configuration)

## Configuration

1. Copy the `.env.example` file and rename the copy to `.env`
2. Keep the fields as specified by the example in order to use the default configuration (recommended for development).
3. Run `npm start` to start the frontend client!

## Project Overview

Within the **/src** folder, you'll find the source of the project in the following layout:

* **/actions**: Contains any Redux thunks related to managing the state of the application. Most of these actions dispatch an `apiAction` action creator (explained below).
* **/components**: Reusable components that are not specific to a particular view
* **/assets**: Any miscellaneous items for the project (contains SCSS files and fallbacks for now, **you should use Material UI's styling system over this**)
* **/layouts**: Second entry point beyond the `App` component that will render the actual views under a specific layout. For example, the `App` component will render a layout, to which the layout will take in the current route and render the appropriate view under `<Suspense>`

```jsx
<Suspense fallback={<LinearProgress />}>
            {renderRoutes(route.routes)}
</Suspense>
```

* **/mixins**: Various mixins for the project, its use should be avoided.
* **/mock**: Mock APIs for the project, not to be used anymore.
* **/reducers**: Redux reducers. These reducers are combined in **/reducers/index.js** by `combineReducers()`
* **/store**: Redux store configuration + middleware. **Here is where our custom apiMiddleware handler is located** (explained more later)
* **/theme**: Material UI theme configuration and overrides
* **/utils**: Various utility functions that can be reused and are not specific to a particular task or view
* **/views**: Views/pages that get rendered under a particular layout
* **/routes.js**: React Router configuration

### Notable files:

* **/layouts/Dashboard/navConfig.js**: JavaScript file that sets the layout of the sidebar. After adding a new page, add the appropriate routes to **/routes.js** and then add the route along with an icon and a title to **/layouts/Dashboard/navConfig.js** if it should appear in the sidebar.

## Making API Requests
All API requests should be made with the `apiAction` creator:
**/actions/axiosActions.js**
```js
// Action creator that takes advantage of the apiMiddleware with the "API" action.type
// The "apiMiddleware" middleware makes use of the above action creators
// We set the below defaults, so every value does not need to be filled
export const apiAction = ({
  url,
  method = 'GET',
  data = null,
  onSuccess = () => {},
  onFailure = () => {},
  label
}) => ({
  type: API,
  payload: {
    url,
    method,
    data,
    onSuccess,
    onFailure,
    label
  }
});
```
You would make use of this action creator in a thunk as follows:
**/actions/pathwayActions.js**
```js
export const createPathway = (pathwayInformation, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: '/pathways',
      method: 'POST',
      data: pathwayInformation,
      onSuccess, // Passed in
      onFailure, // Passed in
      label: CREATE_PATHWAY
    })
  );
};
```
Here, you can see how the thunk can take in any information. It is also **required** that you pass it an `onFailure` and `onSuccess` handler, to which these can be defined in the component and will be called appropriately.

These actions will be received by the `apiMiddleware` middleware:
**/store/apiMiddleware.js**
```js
import axios from 'axios';
import {
  API,
  accessDenied,
  apiError,
  apiStart,
  apiSuccess,
  apiEnd
} from 'src/actions/axiosActions';

const apiMiddleware = ({ dispatch, getState }) => next => action => {
  // Middleware setup
  next(action); // Pass action along

  if (action.type !== API) return; // Prevent any other actions other than API requests from triggering network requests

  const {
    url, // Endpoint to make request to
    method, // HTTP method
    data, // Data (POST OR PUT) | query parameter (GET or DELETE)
    bearerToken = getState().session.bearerToken, // Authentication token override
    onSuccess, // Callback function on success
    onFailure, // Callback function on failure
    label, // String representation of request
    headers // Custom headers for request
  } = action.payload;

  // Gets the appropriate key for the axios request dependent on method (see `data` above)
  const dataOrParams = ['GET', 'DELETE'].includes(method) ? 'params' : 'data';

  // axios default configs
  if (!process.env.REACT_APP_API_BASE_URL) {
    // eslint-disable-next-line
    console.log('Warning: BASE_URL not defined, please specify base API URL');
  }
  axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL || '';
  axios.defaults.headers.common['Content-Type'] = 'application/json';
  axios.defaults.headers.common.Authorization = bearerToken;

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
    // eslint-disable-next-line
    .then(({ data }) => {
      // Dispatches API_SUCCESS action with label as payload to be received by a reducer
      dispatch(apiSuccess(label));
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
        dispatch(accessDenied(error.message));
        // prompt to sign out
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
```
