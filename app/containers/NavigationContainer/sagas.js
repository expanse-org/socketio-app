// import { take, call, put, select } from 'redux-saga/effects';

import { call, put, takeLatest } from 'redux-saga/effects';
import { REQUEST_BLOCKS } from './constants';
import { requestBlocksSuccess, requestBlocksFailed } from './actions';
export function fetchBlocksFromServer() {
  return fetch('http://52.177.188.117:8080/blocks?page=1')
    .then((response) => response.json());
}

function* fetchBlocks() {

  try {
    const blocks = yield call(fetchBlocksFromServer);
    yield put(requestBlocksSuccess(blocks));
  } catch (e) {
    yield put(requestBlocksFailed(e.message));
  }
}
// Individual exports for testing
export function* fetchBlocksSaga() {
  // See example in containers/HomePage/sagas.js
  yield takeLatest(REQUEST_BLOCKS, fetchBlocks);
}

// All sagas to be loaded
export default [
  fetchBlocksSaga,
];
