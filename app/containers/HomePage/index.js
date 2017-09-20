/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'semantic-ui-react';
import { makeSelectLoading, makeSelectError, makeSelectBlocks } from 'containers/App/selectors';
import H2 from 'components/H2';
import CenteredSection from './CenterSection';

import Section from './Section';
import messages from './messages';
import { loadBlocks } from '../App/actions';

import NavigationContainer from '../../containers/NavigationContainer';
export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.loadBlocks();
  }

  render() {
    return (
      <article>
        <Helmet
          title="Home Page"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application homepage' },
          ]}
        />
        <div>
          <CenteredSection>
            <NavigationContainer />
            <Button />
            <H2>
              <FormattedMessage {...messages.startProjectHeader} />
            </H2>
          </CenteredSection>
        </div>
      </article>
    );
  }
}

HomePage.propTypes = {
  loading: React.PropTypes.bool,
  error: React.PropTypes.oneOfType([
    React.PropTypes.object,
    React.PropTypes.bool,
  ]),
};

export function mapDispatchToProps(dispatch) {
  return {
    loadBlocks: () => dispatch(loadBlocks()),
  };
}

const mapStateToProps = createStructuredSelector({
  blocks: makeSelectBlocks(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

