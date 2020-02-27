import { apiAction } from './axiosActions';

export const CREATE_MODULE = 'CREATE_MODULE';
export const FETCH_MODULE = 'FETCH_MODULE';
export const FETCH_MODULES = 'FETCH_MODULES';

export const createModule = (moduleInformation, onFailure, onSuccess) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: '/modules',
      method: 'POST',
      data: moduleInformation,
      onSuccess, // Passed in
      onFailure, // Passed in
      label: CREATE_MODULE
  }));
};

export const fetchModule = (moduleId, onFailure, onSuccess) => async (dispatch, getState) => {
  // Intercepts the data and performs operations on it before sending it to the handler
  const derivedOnSuccess = (data) => {
    const newData = data;

    if (!data.author) {
      newData.author = {
        firstName: 'User',
        lastName: 'Removed',
        avatar: 'https://i.imgur.com/54Uw1Vi.png'
      };
    }

    onSuccess(newData);
  };

  dispatch(
    apiAction({
      url: `/modules/${moduleId}`,
      method: 'GET',
      onSuccess: derivedOnSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_MODULE
    })
  );
};

export const fetchModules = (onFailure, onSuccess) => async (dispatch, getState) => {
  // Intercepts the data and performs operations on it before sending it to the handler
  const derivedOnSuccess = (data) => {
    const modules = [];

    data.forEach((module) => {
      const newModule = module;
      if (!module.author) {
        newModule.author = {
          firstName: 'User',
          lastName: 'Removed',
          avatar: 'https://i.imgur.com/54Uw1Vi.png'
        };
      }
      modules.push(newModule);
    });

    onSuccess(modules);
  };

  dispatch(
    apiAction({
      url: '/modules',
      method: 'GET',
      onSuccess: derivedOnSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_MODULES
    })
  );
};


// const bearerToken = getState().session.bearerToken
// alert(bearerToken)
// const config = {
//   headers: { Authorization: bearerToken },
// }

// // Tells application that we are trying to create the pathway
// dispatch({
//   type: PATHWAY_CREATE_BEGIN
// })

// try {
//   const pathway = await axios.post(`/api/pathways`, pathwayInformation, config).then(p => p.data)
//   console.log("Pathway", pathway)
//   // If we successfully get it, we dispatch the pathway to the store
//   dispatch({
//     type: PATHWAY_CREATE_SUCCESS,
//     payload: {
//       pathway
//     }
//   })
// } catch(exception) {
//   // If we encounter any exception, we dispatch an error
//   dispatch({
//     type: PATHWAY_CREATE_FAIL,
//     payload: {
//       error: exception
//     }
//   })
// }
