// import { take, call, put, select } from 'redux-saga/effects';

// Individual exports for testing

import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { ADD_USER } from './constants';
import { addUserFalseAction, addUserSuccessAction } from './actions';
export function* featchAddUser(action) {
  try {
    const data = yield call(request, 'http://localhost:4040/api/users', {
      method: 'POST',
      body: JSON.stringify(action.body),
    });
    yield put(addUserSuccessAction(data));
  } catch (err) {
    yield put(addUserFalseAction(err));
  }
}

// Individual exports for testing
export default function* addUserPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(ADD_USER, featchAddUser);
}
