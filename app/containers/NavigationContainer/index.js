/*
 *
 * NavigationContainer
 *
 */

import React  from 'react';
import { connect } from 'react-redux';
import makeSelectNavigationContainer from './selectors';
import Navigation from '../../components/Navigation';
import { requestBlocks } from './actions';

export class NavigationContainer extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    requestBlocks: React.PropTypes.func.isRequired,
  }
  componentWillMount() {
    this.props.requestBlocks();
  }
  render() {
    console.log(this.props)
    return (
      <div>
        <Navigation {...this.props} />
      </div>
    );
  }
}


const mapStateToProps = makeSelectNavigationContainer();

function mapDispatchToProps(dispatch) {
  return {
    requestBlocks: () => dispatch(requestBlocks()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationContainer);
