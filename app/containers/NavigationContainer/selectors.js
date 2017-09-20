import { createSelector } from 'reselect';

/**
 * Direct selector to the navigationContainer state domain
 */
const selectNavigationContainerDomain = () => (state) => state.get('navigation');

/**
 * Other specific selectors
 */


/**
 * Default selector used by NavigationContainer
 */

const makeSelectNavigationContainer = () => createSelector(
  selectNavigationContainerDomain(),
  (substate) => substate.toJS()
);

export default makeSelectNavigationContainer;
export {
  selectNavigationContainerDomain,
};
