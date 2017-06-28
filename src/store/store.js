import { combineReducers, createStore, applyMiddleware } from 'redux';
import cards from "../reducers/cards";
import user from "../reducers/user";
import notifications from '../reducers/notifications';
import logger from "redux-logger";
import { reducer as formReducer } from 'redux-form';
import { logUserIn } from '../actions/actions';

const rootReducer = combineReducers({
  form: formReducer,
  cards,
  user,
  notifications,
});

const defaultState = {
  cards: [],
  user: {},
  notifications: []
};

const lastUser = store => {
  let prevData = localStorage.getItem('cgData') || '{}';
  prevData = JSON.parse(prevData);

  if (prevData.username && prevData.email && prevData.token) {
    store.dispatch(logUserIn(prevData));
  }

  return store;
};

// const store = createStore(rootReducer, defaultState, applyMiddleware(logger));
// NOTE: Use the one below instead if you don't want the redux logs in the
// browser console.
const store = createStore(rootReducer, defaultState);

export default lastUser(store);
