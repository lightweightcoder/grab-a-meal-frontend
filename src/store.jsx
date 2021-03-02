import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  activities: [],
  profile: {},
  selectedActivity: {},
};

// just like the todo app, define each action we want to do on the
// data we defined above
const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
const RETRIEVE_ACTIVITY = 'RETRIEVE_ACTIVITY';
const UPDATE_ACTIVITY = 'UPDATE_ACTIVITY';
const DELETE_ACTIVITY = 'DELETE_ACTIVITY';
const LEAVE_ACTIVITY = 'LEAVE_ACTIVITY';
const RETREIVE_PROFILE = 'RETREIVE_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';

// define the matching reducer function
export function appReducer(state, action) {
  switch (action.type) {
    case RETRIEVE_ACTIVITY:
      return { ...state, activities: action.payload.activities };
    case CREATE_ACTIVITY:
      // eslint-disable-next-line max-len
      return { ...state, activities: action.payload.activities, selectedActivity: action.payload.selectedActivity };
    // case REMOVE_CART:
    //   const cart = state.filter((_item, i) => action.payload.cartIttemIndex !== i);
    //   return { ...state, cart };
    default:
      return state;
  }
}

// The following action-generating functions are commonly referred to
// as "action creators". They accept any input relevant to the action,
// and return an object that represents that action, which is typically
// passed to the dispatch function. Actions always contain a type attribute
// used to identify the action and tell the reducer what logic to run.
// export function addCartAction(item) {
//   return {
//     type: ADD_CART,
//     payload: {
//       item,
//     },
//   };
// }
export function retrieveActivityAction(activities) {
  return {
    type: RETRIEVE_ACTIVITY,
    payload: {
      activities,
    },
  };
}
export function createActivityAction(data) {
  const { activities } = data;
  const selectedActivity = data.newActivityDetails;
  return {
    type: CREATE_ACTIVITY,
    payload: {
      activities,
      selectedActivity,
    },
  };
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Provider Code
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the provider HOC

export const AppContext = React.createContext(null);
const { Provider } = AppContext;

// export a provider HOC that contains the initalized reducer
// pass the reducer as context to the children
// any child component will be able to alter the state of the app
export function AppProvider({ children }) {
  const [store, dispatch] = useReducer(appReducer, initialState);
  return (
    <Provider value={{ store, dispatch }}>
      {children}
    </Provider>
  );
}

/* ********************************
 * ********************************
 * ********************************
 * ********************************
 *        Requests
 * ********************************
 * ********************************
 * ********************************
 * ********************************
 */

// In this section we extract out the
// code that makes requests to the backend
//
// these functions must be passed the dispatch from the current context

export const BACKEND_URL = 'http://localhost:3004';

export function retrieveActivities(dispatch) {
  axios.get(`${BACKEND_URL}/activities`).then((result) => {
    dispatch(retrieveActivityAction(result.data.activities));
  });
}

export function createActivity(dispatch, activity) {
  return new Promise((resolve, reject) => {
    axios.post(`${BACKEND_URL}/activities`, activity)
      .then((result) => {
        // add the new activity as the selected activity and update the activities in store
        dispatch(createActivityAction(result.data));

        resolve(result.data.newActivityDetails.id);
      })
      .catch((error) => {
        console.log('create activity error', error);

        // redirect user to login page as user tried to access a forbidden page
        if (error.message === 'Request failed with status code 403') {
          console.log('forbidden error');
          resolve({ error: true });
        }

        resolve({ error: true });
      });
  });
}

// let a user become a participant of that activity
export function joinActivity(dispatch, activityId) {
  // create a new entry in the activities_users table of the DB
  // i.e. the user is recorded as a participant of an activity
  return axios.post(`${BACKEND_URL}/activities/${activityId}/participants`)
    .then((result) => {
      // update the store in AppProvider with the updated activities
      dispatch(retrieveActivityAction(result.data.activities));

      // return error is false to prevent
      // TypeError: Cannot read property 'error' of undefined
      // in Home.jsx from occuring
      return { error: false };
    })
    .catch((error) => {
      console.log('join activity error', error);

      // redirect user to login page as user tried to access a forbidden page
      if (error.message === 'Request failed with status code 403') {
        console.log('forbidden error');
        return { error: true };
      }

      return { error: true };
    });
}
