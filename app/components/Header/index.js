import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Dropdown, Menu } from 'semantic-ui-react'
import NavBar from './NavBar';
import HeaderLink from './HeaderLink';
import messages from './message';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function

  state = { activeItem: 'home' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state
    return (
      <div>
        <Menu>
          <Menu.Item>
            TokenLab
          </Menu.Item>
          <Menu.Item
            active={activeItem === 'home'}
            onClick={this.handleItemClick}
          > <FormattedMessage {...messages.home} />
          </Menu.Item>
          <Menu.Menu position="right">
            <Dropdown item text="Language">
              <Dropdown.Menu>
                <Dropdown.Item>English</Dropdown.Item>
                <Dropdown.Item>Russian</Dropdown.Item>
                <Dropdown.Item>Spanish</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            <Menu.Item>
              <Button primary>Sign Up</Button>
            </Menu.Item>
            <Menu.Item>
              <Button>Login</Button>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
        <NavBar>
          <HeaderLink to="/">
            <FormattedMessage {...messages.home} />
          </HeaderLink>
          <HeaderLink to="/features">
            <FormattedMessage {...messages.features} />
          </HeaderLink>
		  <HeaderLink to="/tokenlab_form">
            <FormattedMessage {...messages.tokenlab_form} />
          </HeaderLink>
		   <HeaderLink to="/chatcontainer">
            <FormattedMessage {...messages.chatcontainer} />
          </HeaderLink>
        </NavBar>
      </div>
    );
  }
}

export default Header;
