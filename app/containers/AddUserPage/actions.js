/*
 *
 * AddUserPage actions
 *
 */

import { DEFAULT_ACTION, ADD_USER_SUCCESS, ADD_USER, ADD_USER_FALSE } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}
export function addUserAction(body) {
  return {
    type: ADD_USER,
    body,
  };
}
export function addUserSuccessAction(data) {
  return {
    type: ADD_USER_SUCCESS,
    data,
  };
}
export function addUserFalseAction(err) {
  return {
    type: ADD_USER_FALSE,
    err,
  };
}
