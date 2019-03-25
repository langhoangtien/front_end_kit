/*
 *
 * UsersPage actions
 *
 */

import {
  DEFAULT_ACTION,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FALSE,
  GET_ALL_USER,
  GET_CONFIG,
  GET_CONFIG_FALSE,
  GET_CONFIG_SUCCESS,
  UPDATE_GET_CONFIG_SUCCESS,
  UPDATE_GET_CONFIG_FALSE,
  UPDATE_GET_CONFIG,
  DELETE_USERS,
  DELETE_USERS_SUCCESS,
  DELETE_USERS_FALSE,
} from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function fetchAllUserAction(id) {
  return {
    type: GET_ALL_USER,
    id,
  };
}
export function fetchAllUserSuccessAction(data) {
  return {
    type: GET_ALL_USER_SUCCESS,
    data,
  };
}
export function fetchAllUserfalseAction() {
  return {
    type: GET_ALL_USER_FALSE,
  };
}
export function fetchConfigAction(id) {
  return {
    type: GET_CONFIG,
    id,
  };
}
export function fetchConfigSuccessAction(data) {
  return {
    type: GET_CONFIG_SUCCESS,
    data,
  };
}
export function fetchConfigfalseAction() {
  return {
    type: GET_CONFIG_FALSE,
  };
}
export function fetchUpdateConfigAction(body) {
  return {
    type: UPDATE_GET_CONFIG,
    body,
  };
}
export function fetchUpdateConfigSuccessAction(data) {
  return {
    type: UPDATE_GET_CONFIG_SUCCESS,
    data,
  };
}
export function fetchUpdateConfigfalseAction() {
  return {
    type: UPDATE_GET_CONFIG_FALSE,
  };
}
export function fetchDeleteUsersAction(body) {
  return {
    type: DELETE_USERS,
    body,
  };
}
export function fetchDeleteUsersSuccessAction(data) {
  return {
    type: DELETE_USERS_SUCCESS,
    data,
  };
}
export function fetchDelteUsersfalseAction() {
  return {
    type: DELETE_USERS_FALSE,
  };
}
