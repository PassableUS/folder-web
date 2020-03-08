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
