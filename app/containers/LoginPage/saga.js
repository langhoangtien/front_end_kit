import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';
import { LOGIN } from './constants';
import { loginSuccessAction, loginFalseAction } from './actions';
export function* featchLogin(action) {
  try {
    const data = yield call(request, 'http://localhost:4040/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(action.body),
    });

    if (data.token) {
      localStorage.setItem('fullName', data.username);
      localStorage.setItem('token', data.token);
      yield put(loginSuccessAction(data));
    } else {
      yield put(loginFalseAction({}));
    }
  } catch (err) {
    yield put(loginFalseAction(err));
  }
}

// Individual exports for testing
export default function* loginPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(LOGIN, featchLogin);
}
