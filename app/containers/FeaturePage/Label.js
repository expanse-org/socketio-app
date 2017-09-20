import React from 'react';
import styled from 'styled-components';


const SecondaryLabel = styled.label`
	color: #498284;
	font-size: 17px;
`;

function Label(props) {
  return (
	<SecondaryLabel className={props.className}>
		{props.LabelName}
	</SecondaryLabel>
  );
}

export default Label;