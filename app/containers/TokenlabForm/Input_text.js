import React from 'react';
import styled from 'styled-components';


const SecondaryInput = styled.input`
	
`;

function Input_text(props) {
  return (
	<SecondaryInput type={props.type} className={props.className} placeholder={props.placeholder}/>

  );
}

export default Input_text;