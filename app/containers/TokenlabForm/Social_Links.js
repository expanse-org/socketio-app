import React from 'react';
import styled from 'styled-components';

const SecondaryButton = styled.button`
	margin:0 1em;
	border-radius:0.5em;
	height:2em;
	
`;

const SecondaryLabel = styled.label`
	font-size: 16px;
    color: #383838;
    letter-spacing: 0px;
    float: right;
`;

function Social_Links() {
  return (
  <fieldset>
	<div className="row form-group">
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				Social_Links
			</SecondaryLabel>
		</div>
		
		<div  className="col-md-7">
			<SecondaryButton className="btn-info col-md-2">
				f
			</SecondaryButton>
			<SecondaryButton className="btn-info col-md-2">
				t
			</SecondaryButton>
			<SecondaryButton className="btn-info col-md-2">
				in
			</SecondaryButton>
			<SecondaryButton className="btn-info col-md-2">
				YTube
			</SecondaryButton>
		</div>
	</div>
  </fieldset>
  );
}

export default Social_Links;