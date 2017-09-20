/*
 *
 * FeaturePage
 *
 */

import React from 'react';
import Helmet from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import 'bootstrap/dist/css/bootstrap.css';
import messages from './messages';

export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
	
	  shouldComponentUpdate() {
		return false;
	  }

  render() {
    return (
      <div>
        <Helmet
          title="FeaturePage"
          meta={[
            { name: 'description', content: 'Description of FeaturePage' },
          ]}
        />
        <FormattedMessage {...messages.header} />
		
      </div>
    );
  }
}

