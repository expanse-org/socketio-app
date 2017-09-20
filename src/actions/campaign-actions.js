import * as types from './action-types';

export const addCampaign = (campaign) => {
  return {
    type: types.ADD_CAMPAIGN,
    campaign
  };
}
