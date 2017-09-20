/**
 * Gets the repositories of the user from Github
 */

import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import { LOAD_REPOS, LOAD_BLOCKS,LOAD_BLOCKS_SUCCESS} from '../../containers/App/constants';
import { reposLoaded, repoLoadingError, blocksLoaded, blocksLoadingError } from 'containers/App/actions';

import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}


export function* getBlocks() {
  const requestURL = 'http://52.177.188.117:8080/blocks?page=1';

  try {
    // Call our request helper (see 'utils/request')
    const blocks = yield call(request, requestURL);
    yield put(blocksLoaded(blocks));
  } catch (err) {
    yield put(blocksLoadingError(err));
  }
}
/**
 * Root saga manages watcher lifecycle
 */
export function* githubData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
 // const watcher = yield takeLatest(LOAD_REPOS, getRepos);
  const watcher = yield takeLatest(LOAD_BLOCKS, getBlocks);
  // Suspend execution until location changes
  yield take(LOAD_BLOCKS_SUCCESS);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  githubData,
];
