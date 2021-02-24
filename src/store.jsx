import React, { useState, useReducer, useContext } from 'react';
import axios from 'axios';

axios.defaults.withCredentials = true;

// create an object that represents all the data contained in the app
// we moved all of this data from the app component into the store
export const initialState = {
  activities: [],
  profile: {},
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
    // case ADD_CART:
    //   return { ...state, cart: [...state.cart, action.payload.item] };
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
export function addCartAction(item) {
  return {
    type: ADD_CART,
    payload: {
      item,
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

const BACKEND_URL = 'http://localhost:3004';

// export function loadItems(dispatch) {
//   axios.get(`${BACKEND_URL}/items`).then((result) => {
//     dispatch(loadItemsAction(result.data.items));
//   });
// }
