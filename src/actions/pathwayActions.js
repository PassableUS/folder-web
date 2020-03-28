import { apiAction } from './axiosActions';

export const CREATE_PATHWAY = 'CREATE_PATHWAY';
export const FETCH_PATHWAY = 'FETCH_PATHWAY';
export const FETCH_PATHWAYS = 'FETCH_PATHWAYS';
export const FETCH_ENROLLED_PATHWAYS = 'FETCH_ENROLLED_PATHWAYS';
export const JOIN_PATHWAY = 'JOIN_PATHWAY';

export const createPathway = (
  pathwayInformation,
  onFailure,
  onSuccess
) => async (dispatch, getState) => {
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

export const fetchPathway = (pathwayId, onFailure, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(
    apiAction({
      url: `/pathways/${pathwayId}`,
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_PATHWAY
    })
  );
};

export const fetchPathways = (onFailure, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(
    apiAction({
      url: '/pathways',
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_PATHWAYS
    })
  );
};

export const fetchVerifiedPathways = (onFailure, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(
    apiAction({
      url: '/pathways',
      method: 'GET',
      data: {
        requestVerifiedOnly: true
      },
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_PATHWAYS
    })
  );
};

export const fetchEnrolledPathways = (onFailure, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(
    apiAction({
      url: '/pathways/user/enrolled',
      method: 'GET',
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_ENROLLED_PATHWAYS
    })
  );
};

export const addModuleToPathway = (
  moduleId,
  pathwayId,
  onFailure,
  onSuccess
) => async (dispatch, getState) => {
  dispatch(
    apiAction({
      url: `/pathways/${pathwayId}`,
      method: 'PUT',
      data: {
        moduleId
      },
      onSuccess, // Passed in
      onFailure, // Passed in
      label: FETCH_PATHWAYS
    })
  );
};

export const joinPathway = (pathwayId, onFailure, onSuccess) => async (
  dispatch,
  getState
) => {
  dispatch(
    apiAction({
      url: `/pathways/join`,
      method: 'POST',
      data: {
        pathwayId
      },
      onSuccess, // Passed in
      onFailure, // Passed in
      label: JOIN_PATHWAY
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
