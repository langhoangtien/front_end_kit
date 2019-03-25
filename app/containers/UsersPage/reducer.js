/*
 *
 * UsersPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  DEFAULT_ACTION,
  GET_ALL_USER,
  GET_ALL_USER_FALSE,
  GET_ALL_USER_SUCCESS,
  GET_CONFIG_FALSE,
  GET_CONFIG,
  GET_CONFIG_SUCCESS,
  UPDATE_GET_CONFIG,
  UPDATE_GET_CONFIG_FALSE,
  UPDATE_GET_CONFIG_SUCCESS,
  DELETE_USERS_FALSE,
  DELETE_USERS_SUCCESS,
  DELETE_USERS,
} from './constants';

export const initialState = fromJS({});

function usersPageReducer(state = initialState, action) {
  switch (action.type) {
    case DEFAULT_ACTION:
      return state;
    case GET_ALL_USER:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_ALL_USER_FALSE:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_ALL_USER_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('arrUser', action.data);
    case GET_CONFIG:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case GET_CONFIG_FALSE:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case GET_CONFIG_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('config', action.data);
    case UPDATE_GET_CONFIG:
      return state
        .set('loading', true)
        .set('success', false)
        .set('error', false);
    case UPDATE_GET_CONFIG_FALSE:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', true);
    case UPDATE_GET_CONFIG_SUCCESS:
      return state
        .set('loading', false)
        .set('success', false)
        .set('error', false)
        .set('config', action.data);
    case DELETE_USERS:
      return state
        .set('loading', true)
        .set('successDelete', false)
        .set('error', false);
    case DELETE_USERS_FALSE:
      return state
        .set('loading', false)
        .set('successDelete', false)
        .set('error', true);
    case DELETE_USERS_SUCCESS:
      return state
        .set('loading', false)
        .set('successDelete', true)
        .set('error', false);
    // .set('config', action.data);
    default:
      return state;
  }
}

export default usersPageReducer;
