import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import {Form, Button, Checkbox, Table, Section, Item, Container, Header, List, Icon} from 'semantic-ui-react'

class NewCampaign extends Component {    

    state = { ticker: '' }

    handleChange = (e, data) => {
        this.setState({
            [data.name]: data.value
        })

    }

    render() {

        const { ticker } = this.state;

        return (
            <div>
                <Form>
                    <Form.Field>
                        <label>Ticker</label>
                        <Form.Input placeholder='Ticker' name='ticker' value={ticker} onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Bought On</label>
                        <Form.Input placeholder='Bought On' />
                    </Form.Field>
                    <Form.Field>
                        <label>Ends In</label>
                        <input placeholder='Ends In' />
                    </Form.Field>
                    <Form.Field>
                        <label>You Own</label>
                        <input placeholder='You Own' />
                    </Form.Field>
                    <Form.Field>
                        <label>You Paid</label>
                        <input placeholder='You Paid' />
                    </Form.Field>
                    <Form.Field>
                        <Checkbox label='I agree to the Terms and Conditions' />
                    </Form.Field>
                    {/*<Button type='submit'>Submit</Button>*/}
                </Form>
                <strong>onChange:</strong>
                <pre>{JSON.stringify({ ticker }, null, 2)}</pre>
            </div>
        )
    }
}

export default NewCampaign;