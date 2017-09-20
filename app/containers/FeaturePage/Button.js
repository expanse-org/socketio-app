import React from 'react';
import styled from 'styled-components';


const SecondaryButton = styled.button`
	
`;

function Button(props) {
  return (
	<SecondaryButton className={props.className}>
		{props.text}
	</SecondaryButton>
  );
}

export default Button;