import React, { Component } from 'react'
import {Switch, Route} from 'react-router-dom'
import NewCampaign from './NewCampaign'
import {Modal, Button, Table, Section, Item, Container, Header, List, Icon} from 'semantic-ui-react'

export const DashboardRoutes = () => (
    <Switch>
        <Route exact path='/dashboard' component={Dashboard} />
    </Switch>
)

const DashboardSection = (props) => (
    <Table compact celled color={props.color} key={props.color}>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell colSpan="6">{props.sectionName}</Table.HeaderCell>
            </Table.Row>
        </Table.Header>
        <Table.Body>
            <Table.Row>
                <Table.Cell>
                    <Icon name="umbrella" /> LAB
                </Table.Cell>
                <Table.Cell>Bought on 10/20/2016 10:00 AM</Table.Cell>
                <Table.Cell>Ends in 2 days</Table.Cell>
                <Table.Cell>You own 10000 LAB</Table.Cell>
                <Table.Cell>You paid 100 EXP</Table.Cell>
            </Table.Row>
        </Table.Body>
        <Table.Footer>

        </Table.Footer>
    </Table>
)

class Dashboard extends Component {
    
    state = {
        open: false
    }

    open = () => this.setState({
        open: true
    })
    
    render() {

        const { open } = this.state;

        return (
            <Container>
                <Button onClick={this.open} primary>Add New Compaign</Button>
                <DashboardSection sectionName="My Campaings" color="green" />
                <DashboardSection sectionName="My Investments" color="teal" />
                <DashboardSection sectionName="My Watchlist" color="blue" />
                <DashboardSection sectionName="Ongoing Campaings" color="orange" />
                <Modal open={open}>
                    <Modal.Content>
                        <NewCampaign />
                    </Modal.Content>
                </Modal>
            </Container>
        );
    }
}

export default Dashboard;