import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  activities: [],
  profile: {},
  selectedActivity: {},
  loggedInUserId: null,
};

// define each action we want to do on the data we defined above
const CREATE_ACTIVITY = 'CREATE_ACTIVITY';
const RETRIEVE_ACTIVITY = 'RETRIEVE_ACTIVITY';
const RETREIVE_PROFILE = 'RETREIVE_PROFILE';
const UPDATE_PROFILE = 'UPDATE_PROFILE';
const SET_USERID = 'SET_USERID';

// define the matching reducer function
export function appReducer(state, action) {
  switch (action.type) {
    case RETRIEVE_ACTIVITY:
      return { ...state, activities: action.payload.activities };
    case CREATE_ACTIVITY:
      // eslint-disable-next-line max-len
      return { ...state, activities: action.payload.activities, selectedActivity: action.payload.selectedActivity };
    case SET_USERID:
      return { ...state, loggedInUserId: action.payload.loggedInUserId };
    default:
      return state;
  }
}

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

export function setLoggedInUserIdAction(userId) {
  return {
    type: SET_USERID,
    payload: {
      loggedInUserId: userId,
    },
  };
}

export function logoutAction() {
  return {
    type: SET_USERID,
    payload: {
      loggedInUserId: null,
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
// export const BACKEND_URL = 'https://hangouts-backend.herokuapp.com';

export function retrieveActivities(dispatch) {
  return axios.get(`${BACKEND_URL}/activities`, { withCredentials: true }).then((result) => {
    dispatch(retrieveActivityAction(result.data.activities));
    return { error: false };
  }).catch((error) => {
    // redirect user to login page as user tried to access a forbidden page
    if (error.message === 'Request failed with status code 403') {
      console.log('forbidden error');
      return { error: true };
    }
    console.log(error);
    return { error: true };
  });
}

// allow a user to create an activity
export function createActivity(dispatch, activity) {
  return new Promise((resolve, reject) => {
    axios.post(`${BACKEND_URL}/activities`, activity, { withCredentials: true })
      .then((result) => {
        // add the new activity as the selected activity and update the activities in store
        dispatch(createActivityAction(result.data));

        resolve(result.data.newActivityDetails);
        console.log(result.data.newActivityDetails);
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
  return axios.post(`${BACKEND_URL}/activities/${activityId}/participants`, {}, { withCredentials: true })
    .then((result) => {
      // update the store in AppProvider with the updated activities
      dispatch(retrieveActivityAction(result.data.activities));
      console.log(result.data.activities, 'inside store');
      const activityData = result.data.activities;
      // return an object that contains anything to prevent
      // TypeError: Cannot read property 'error' of undefined
      // in Home.jsx from occuring
      return { error: false, activity: activityData };
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

// allow the user edit his/her activity
export function editActivity(dispatch, activity) {
  // update the activity in the DB
  return axios.put(`${BACKEND_URL}/activities/${activity.id}`, activity, { withCredentials: true })
    .then((result) => {
      // update the store in AppProvider with the updated activities
      dispatch(retrieveActivityAction(result.data.activities));

      // return the updated activity details
      return { updatedActivity: result.data.updatedActivity };
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

// allow the user to leave an activity
export function leaveActivity(dispatch, activityId) {
  // make an axios delete request to remove the participant from the activity in the database
  return axios.delete(`${BACKEND_URL}/activities/${activityId}/participants`, { withCredentials: true })
    .then((result) => {
      // update the store in AppProvider with the updated activities (and its participants)
      dispatch(retrieveActivityAction(result.data.activities));
      const activityData = result.data.activities;
      // return an object that contains anything to prevent
      // TypeError: Cannot read property 'error' of undefined
      // in Home.jsx from occuring
      return { error: false, activityData };
    })
    .catch((error) => {
      console.log('leave activity error', error);

      // redirect user to login page as user tried to access a forbidden page
      if (error.message === 'Request failed with status code 403') {
        console.log('forbidden error');
        return { error: true };
      }

      return { error: true };
    });
}

// allow the user to delete an activity
export function deleteActivity(dispatch, activityId) {
  // make an axios delete request to cancel the activity in the database
  return axios.delete(`${BACKEND_URL}/activities/${activityId}`, { withCredentials: true })
    .then((result) => {
      // update the store in AppProvider with the updated activities (and its participants)
      dispatch(retrieveActivityAction(result.data.activities));

      // return an object that contains anything to prevent
      // TypeError: Cannot read property 'error' of undefined
      // in Home.jsx from occuring
      return { error: false };
    })
    .catch((error) => {
      console.log('delete activity error', error);

      // redirect user to login page as user tried to access a forbidden page
      if (error.message === 'Request failed with status code 403') {
        console.log('forbidden error');
        return { error: true };
      }

      return { error: true };
    });
}

// allow the user to logout
export function logout(dispatch) {
  // make an axios delete request to remove cookies
  return axios.delete(`${BACKEND_URL}/logout`, { withCredentials: true })
    .then(() => {
      // update the loggedInUserId in store to null
      dispatch(logoutAction());

      // return an object that contains anything to prevent
      // TypeError: Cannot read property 'error' of undefined
      // in NavBar.jsx from occuring
      return { error: false };
    })
    .catch((error) => {
      console.log('logout error', error);

      // redirect user to login page as user tried to access a forbidden page
      if (error.message === 'Request failed with status code 403') {
        console.log('forbidden error');
        return { error: true };
      }

      return { error: true };
    });
}
