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
//import { Button } from 'reactstrap';
import Label from './Label';
import Input_text from './Input_text';
import Team_Info from './Team_Info';
import FAQ from './FAQ';
import Social_Links from './Social_Links';
import Button from './Button';
import ActionButton from './ActionButton';
import $ from 'jquery';


export default class FeaturePage extends React.Component { // eslint-disable-line react/prefer-stateless-function
	  constructor(props) {
			super(props);
			
			this.state = {
			  count: 1,
			  
			}
			this.add_nav_menu = this.add_nav_menu.bind(this);
			this.add_ext_links = this.add_ext_links.bind(this);
			this.remove_nav_menu = this.remove_nav_menu.bind(this);
	  }
	  
	  add_nav_menu(event) {
			 event.preventDefault();
		   
			 this.setState(prevState => ({
				count: prevState.count+1
			  }));
			 
			 var inputtag ='<div class="row form-group added_nav" id="nav_menu"><div class="col-md-3"><label class="gNfWLa">Navigation Menu : </label></div><div class="col-md-5"><input type="text" class="form-control fkCowi" placeholder="Enter Menu"></div><div class="col-md-2"><input name="checkbox" type="checkbox" value="1"/></div></div>';
			 
			 $(inputtag).insertBefore($('#nav_menu'));
	  }
	  
	  remove_nav_menu(){
		event.preventDefault();
			
			var a=[];
			
			$('.added_nav input:checkbox:checked').each(function(){
			var value= $(this).val();
			a.push(value);
			$(this).parent().parent().remove();		
			});
			
			if(a=='')
			{
				alert("Please Select Checkbox to Remove field");
			}
	  }
	  
	  
	  add_ext_links(event) {
			 event.preventDefault();
			 
			 var inputtag = '<div class="row  form-group ext_links" id="ext_links"><div class="col-md-3"><label class="gNfWLa">External/Other Links : </label></div><div class="col-md-5"><input type="text" class="form-control fkCowi"></div><div class="col-md-2"><input name="checkbox" type="checkbox" value="1"/></div></div>';
			 $(inputtag).insertBefore($('#ext_links')); 
	  }
	  
	  remove_ext_links(){
		event.preventDefault();
			
			var a=[];
			
			$('.ext_links input:checkbox:checked').each(function(){
			var value= $(this).val();
			a.push(value);
			$(this).parent().parent().remove();		
			});
			
			if(a=='')
			{
				alert("Please Select Checkbox to Remove field");
			}
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
        {/*<FormattedMessage {...messages.header} />*/}
		<br/><br/>
			<h1 style={{textAlign:'center',color:'#138496'}}>Tokenlab Form</h1>
		<br/><br/>
		 
		<form  className="form">	
		<div className="container">
		
			<div className="row form-group">
				<div className="col-md-3">
						<Label LabelName="White Paper : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="file" className="form-control"/>
					</div>	
			</div>
			<div className="row  form-group">
				<div  className="col-md-3">
						<Label LabelName="URL/Subdomain : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="text" className="form-control"/>
					</div>	
			</div>
			<div className="row form-group">
				<div  className="col-md-3">
						<Label LabelName="Logo(size=200*200) : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="file" className="form-control"/>
					</div>	
			</div>
			<div className="row  form-group" id="nav_menu">
				<div  className="col-md-3">
						<Label LabelName="Navigation Menu : "/>
					</div>
					
					<div  className="col-md-5">
						<Input_text type="text" placeholder="Enter Menu" className="form-control"/>
					</div>	
					
					<div className="col-md-2">
						<ActionButton className="col-md-6">
							<a className="form-control btn-info" onClick={this.add_nav_menu}>Add</a>
						</ActionButton>
						<ActionButton className="col-md-6">
							<a className="form-control btn-info" onClick={this.remove_nav_menu}>&times;</a>
						</ActionButton>
					</div>
			</div>
			
			<Team_Info />
			
			<div className="row form-group">
				<div  className="col-md-3">
						<Label LabelName="Crowdsale Specifics : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="text" className="form-control"/>
					</div>	
			</div>
			<div className="row form-group">
				<div  className="col-md-3">
						<Label LabelName="Roadmap : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="text" className="form-control"/>
					</div>	
			</div>
			<div className="row form-group">
				<div  className="col-md-3">
						<Label LabelName="Client (Process Image) : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="file" className="form-control"/>
					</div>	
			</div>
			<div className="row form-group">
				<div  className="col-md-3">
						<Label LabelName="External Video : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="text" className="form-control"/>
					</div>	
			</div>
			
			<FAQ />
			
			<div className="row form-group">
				<div  className="col-md-3">
						<Label LabelName="Email Subscription Info : "/>
					</div>
					
					<div  className="col-md-7">
						<Input_text type="file" className="form-control"/>
					</div>	
			</div>
			
			<Social_Links />
			
			<div className="row  form-group" id="ext_links">
				<div  className="col-md-3">
						<Label LabelName="External/Other Links : "/>
					</div>
					
					<div  className="col-md-5">
						<Input_text type="text" className="form-control"/>
					</div>	
					
					
					<div className="col-md-2">
						<ActionButton className="col-md-6">
						<a className="form-control btn-info" onClick={this.add_ext_links}>Add</a>
						</ActionButton>
						<ActionButton className="col-md-6">
							<a className="form-control btn-info" onClick={this.remove_ext_links}>&times;</a>
						</ActionButton>
					</div>
			</div>
			
			<br/><br/>
			
			<div className="row  form-group" id="ext_links">
				<div  className="col-md-3">
						<Label/>
					</div>
					
					<div  className="col-md-3">
						<Button  className="form-control btn-info" text="Submit"/>
					</div>	
					
					<div  className="col-md-3"  onClick={this.add_ext_links}>
						<Button  className="form-control btn-default" text="Cancel"/>
					</div>
			</div>
			
		</div>
		</form>
		<br/><br/>
      </div>
    );
  }
}

