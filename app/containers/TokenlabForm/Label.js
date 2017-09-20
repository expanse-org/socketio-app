import React from 'react';
import styled from 'styled-components';


const SecondaryLabel = styled.label`
    font-size: 16px;
    color: #383838;
    letter-spacing: 0px;
    float: right;
`;

function Label(props) {
  return (
	<SecondaryLabel className={props.className}>
		{props.LabelName}
	</SecondaryLabel>
  );
}

export default Label;