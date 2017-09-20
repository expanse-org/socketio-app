/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import Header from '../../components/Header/index';
import Footer from '../../components/Footer/index';

const AppWrapper = styled.div`
  max-width:100%;
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default class App extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <AppWrapper>
        <Helmet
          titleTemplate="%s - React.js Boilerplate"
          defaultTitle="Asim.js Boilerplate"
          meta={[
            { name: 'description', content: 'A React.js Boilerplate application' },
          ]}
        />
        <Header />
        <div>
          {React.Children.toArray(this.props.children)}
        </div>
        <Footer />
      </AppWrapper>
    );
  }
}
