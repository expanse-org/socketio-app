/*
 *
 * NavigationContainer actions
 *
 */

import {
  REQUEST_BLOCKS,
  REQUEST_BLOCKS_SUCCESS,
  REQUEST_BLOCKS_FAILED,
} from './constants';

export function requestBlocks() {
  return {
    type: REQUEST_BLOCKS,
  };
}

export function requestBlocksSuccess(blocks) {
  return {
    type: REQUEST_BLOCKS_SUCCESS,
    blocks,
  };
}

export function requestBlocksFailed(message) {
  return {
    type: REQUEST_BLOCKS_FAILED,
    message,
  };
}
