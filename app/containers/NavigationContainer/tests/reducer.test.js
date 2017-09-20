
import { fromJS } from 'immutable';
import navigationContainerReducer from '../reducer';

describe('navigationContainerReducer', () => {
  it('returns the initial state', () => {
    expect(navigationContainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
