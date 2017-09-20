import * as types from '../actions/action-types';

export default (state = [], action) => {
  switch (action.type) {
    case types.ADD_CAMPAIGN:
        var newState = Object.assign({}, state);
        newState.campaigns.push({
            ticker: action.payload.ticker,
            boughtOn: action.payload.boughtOn,
            endsIn: action.payload.endsIn,
            youOwn: action.payload.youOwn,
            youPaid: action.payload.youPaid
        });
        return newState;
    default:
        return state;
  }
};
