import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const SecondaryLabel = styled.label`
	color: #498284;
	font-size: 17px;
`;

const SecondaryInput = styled.input`
	
`;
const SecondaryButton = styled.button`
	
`;

	export default class FAQ extends React.Component{

	constructor(props) {
		super(props)

		this.state = {
		  count: 0,
		}
		this.add_faq = this.add_faq.bind(this);
	  }
	   add_faq(event) {
	   event.preventDefault();
	   {/*('#nav_menu').append('kjchigfkjhrhf'); this.setState({count:count+1});*/}
		 
		 this.setState(prevState => ({
		  count: prevState.count+1
		}));
		 var inputtag = '<div id="faq"><div class="row form-group"><div class="col-md-3"><label class="control-label egQnKN">Question :</label></div><div class="col-md-7"><input type="text" class="form-control fkCowi"></div></div><div class="row form-group"><div class="col-md-3"><label class="control-label egQnKN">Answer :</label></div><div class="col-md-7"><input type="text" class="form-control fkCowi"></div></div><div class="row form-group"><div class="col-md-8"></div><div class="col-md-2"><button class="form-control btn-info fkCowi">&times;</button></div></div></div>';
		 $(inputtag).insertBefore($('#faq')); 
	  }
	  
	  shouldComponentUpdate() {
		return true;
	  }


render() {
  return (
  <fieldset style={{color: '#498284',fontSize: '20px',fontWeight:'500'}}>FAQ
  <div id="faq">
	<div className="row form-group">
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				Question : 
			</SecondaryLabel>
		</div>
		<div  className="col-md-7">
			<SecondaryInput type="text" className="form-control"/>
		</div>
	</div>
	
	<div className="row form-group">	
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				Answer : 
			</SecondaryLabel>
		</div>
		<div  className="col-md-7">
			<SecondaryInput type="text" className="form-control"/>
		</div>
	</div>
	
	<div className="row form-group">
		<div  className="col-md-8"></div>
		<div  className="col-md-2" onClick={this.add_faq}>
			<SecondaryButton className="form-control btn-info">
				Add
			</SecondaryButton>
		</div>
	</div>
	</div>
  </fieldset>
  );
}
}