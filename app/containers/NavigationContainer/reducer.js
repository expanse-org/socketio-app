/*
 *
 * NavigationContainer reducer
 *
 */

import { fromJS } from 'immutable';
import {
  REQUEST_BLOCKS_SUCCESS,
} from './constants';

const initialState = fromJS({
  blocks: {
    total_record: 0,
    blocks: [],
  },
});

function navigationContainerReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_BLOCKS_SUCCESS:
      return state.set('blocks', action.blocks)
    default:
      return state;
  }
}

export default navigationContainerReducer;
