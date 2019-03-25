// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, takeLatest, takeEvery } from 'redux-saga/effects';
import request from '../../utils/request';
import {
  fetchAllUserSuccessAction,
  fetchAllUserfalseAction,
  fetchConfigSuccessAction,
  fetchConfigfalseAction,
  fetchUpdateConfigSuccessAction,
  fetchUpdateConfigfalseAction,
  fetchDeleteUsersSuccessAction,
  fetchDelteUsersfalseAction,
} from './actions';
import { GET_ALL_USER, GET_CONFIG, UPDATE_GET_CONFIG, DELETE_USERS } from './constants';
export function* fetchGetAllUser() {
  try {
    // const departmentId = action.departmentId;

    const data = yield call(request, 'http://localhost:4040/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (data) {
      yield put(fetchAllUserSuccessAction(data));
    } else {
      yield put(fetchAllUserfalseAction({}));
    }
  } catch (err) {
    yield put(fetchAllUserfalseAction(err));
  }
}
export function* fetchGetConfig() {
  try {
    // const departmentId = action.departmentId;

    const data = yield call(request, 'http://localhost:4040/api/view-configs/5c8ea461b74423494cb0d13d', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data) {
      yield put(fetchConfigSuccessAction(data));
    } else {
      yield put(fetchConfigfalseAction({}));
    }
  } catch (err) {
    yield put(fetchConfigfalseAction(err));
  }
}
export function* fetchUpdateConfig(action) {
  try {
    // const departmentId = action.departmentId;

    const data = yield call(request, 'http://localhost:4040/api/view-configs/5c8ea461b74423494cb0d13d', {
      method: 'PUT',
      body: JSON.stringify(action.body),
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (data) {
      yield put(fetchUpdateConfigSuccessAction(data));
    } else {
      yield put(fetchUpdateConfigfalseAction({}));
    }
  } catch (err) {
    yield put(fetchUpdateConfigfalseAction(err));
  }
}
export function* fetchDeleteUsers(action) {
  try {
    // const departmentId = action.departmentId;
    const { body } = action;
    for (let i = 0; i < body.length; i += 1) {
      yield call(request, `http://localhost:4040/api/users/${body[i]}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
    }

    yield put(fetchDeleteUsersSuccessAction());
    const data = yield call(request, 'http://localhost:4040/api/users', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });

    if (data) {
      yield put(fetchAllUserSuccessAction(data));
    } else {
      yield put(fetchAllUserfalseAction({}));
    }
  } catch (err) {
    yield put(fetchDelteUsersfalseAction(err));
  }
}

// Individual exports for testing
export default function* usersPageSaga() {
  // See example in containers/HomePage/saga.js
  yield takeLatest(GET_ALL_USER, fetchGetAllUser);
  yield takeLatest(GET_CONFIG, fetchGetConfig);
  yield takeLatest(UPDATE_GET_CONFIG, fetchUpdateConfig);
  yield takeEvery(DELETE_USERS, fetchDeleteUsers);
}
