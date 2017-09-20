import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';
import ActionButton from './ActionButton';

const SecondaryLabel = styled.label`
    font-size: 16px;
    color: #383838;
    letter-spacing: 0px;
    float: right;
`;

const SecondaryInput = styled.input`
	
`;
const SecondaryButton = styled.button`
	letter-spacing: 0px;
    font-weight: 700;
`;
export default class Team_Info extends React.Component{
constructor(props) {
    super(props)

    this.state = {
      count: 0,
    }
	this.add_team_info = this.add_team_info.bind(this);
  }
   add_team_info(event) {
   event.preventDefault();
   {/*('#nav_menu').append('kjchigfkjhrhf'); this.setState({count:count+1});*/}
     
	 this.setState(prevState => ({
      count: prevState.count+1
    }));
     var inputtag = '<div class="team_info" id="team_info"><div class="row form-group"><div class="col-md-3"><label class="control-label gNfWLa">Name :</label></div><div class="col-md-7"><input type="text" class="form-control fkCowi"></div></div><div class="row form-group"><div class="col-md-3"><label class="control-label gNfWLa">Titles :</label></div><div class="col-md-7"><input type="text" class="form-control fkCowi"></div></div><div class="row form-group"><div class="col-md-3"><label class="control-label gNfWLa">Photos :</label></div><div class="col-md-7"><input type="text" class="form-control fkCowi"></div></div><div class="row form-group"><div class="col-md-3"><label class="control-label gNfWLa">URLs (If Applicable) :</label></div><div class="col-md-7"><input type="text" class="form-control fkCowi"></div></div><div class="row form-group"><div class="col-md-5"></div><div class="col-md-7"><input name="checkbox" type="checkbox" value="1"/>Select checkbox to renove this feild</div></div></div>';
	 $(inputtag).insertBefore($('#team_info')); 
  }
  
    remove_team_info(){
		event.preventDefault();
			
			var a=[];
			
			$('.team_info input:checkbox:checked').each(function(){
			var value= $(this).val();
			a.push(value);
			$(this).parent().parent().parent().first().remove();		
			});
			
			if(a=='')
			{
				alert("Please Select Checkbox to Remove field");
			}
	}
  
  shouldComponentUpdate() {
    return true;
  }

render() {
  return (
  <fieldset>    
  <div className="fancy_title"><h2>Team Info</h2></div>
  <div id="team_info">
	<div className="row form-group">
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				Name : 
			</SecondaryLabel>
		</div>
		<div  className="col-md-7">
			<SecondaryInput type="text" className="form-control"/>
		</div>
	</div>
	
	<div className="row form-group">	
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				Titles : 
			</SecondaryLabel>
		</div>
		<div  className="col-md-7">
			<SecondaryInput type="text" className="form-control"/>
		</div>
	</div>
	
	<div className="row form-group">
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				Photos : 
			</SecondaryLabel>
		</div>
		<div  className="col-md-7">
			<SecondaryInput type="text" className="form-control"/>
		</div>
	</div>
	
	<div className="row form-group">
		<div  className="col-md-3">
			<SecondaryLabel className="control-label">
				URL's (If Applicable) : 
			</SecondaryLabel>
		</div>
		<div  className="col-md-7">
			<SecondaryInput type="text" className="form-control"/>
		</div>
	</div>
	
	<div className="row form-group">
		<div  className="col-md-8"></div>
		
		<div className="col-md-2">
			<ActionButton className="col-md-6">
				<a className="form-control btn-info" onClick={this.add_team_info}>Add</a>
			</ActionButton>
			<ActionButton className="col-md-6">
				<a className="form-control btn-info" onClick={this.remove_team_info}>&times;</a>
			</ActionButton>
		</div>
	</div>
  </div>
  </fieldset>
  );
}
}