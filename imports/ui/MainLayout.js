import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image,
  List, Menu, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'
import AccountsUI from './AccountsUI';

//             <AccountsUI />

/* eslint-disable react/no-multi-comp */

class DesktopContainer extends Component {
  state = { activeItem: window.location.pathname }

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { children } = this.props
    const { fixed, activeItem } = this.state
    return (
      <Responsive minWidth = {767} >
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted textAlign='center' style={{  padding: '1em 0em' }} vertical>
          {/* minHeight: 700, */}
            <Menu
              fixed={fixed ? 'top' : null}
              inverted={!fixed}
              pointing={!fixed}
              secondary={!fixed}
              size='large'
            >
              <Container>
                <Menu.Item href="/" as='a'style ={{left: '-30px'}} >Logo.pl</Menu.Item>
                <Menu.Item href="/" as='a' name='/' active={activeItem === '/'} onClick={this.handleItemClick}>Home</Menu.Item>
                <Menu.Item href="#" as='a' name='gallery' active={activeItem === 'gallery'} onClick={this.handleItemClick}>Gallery</Menu.Item>
                <Menu.Item href="/resolutions" as='a' name='resolutions' active={activeItem === 'resolutions'} onClick={this.handleItemClick}>Resolutions</Menu.Item>
                <Menu.Item href='/about' name='/about' as='a' active={activeItem === '/about'} onClick={this.handleItemClick}>About</Menu.Item>
                <Menu.Item position='right'>
                  <AccountsUI />
                  {/* <Button as='a' inverted={!fixed}>Log in</Button> */}
                  {/* <Button as='a' inverted={!fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button> */}
                </Menu.Item>
              </Container>
            </Menu>           
          </Segment>
        </Visibility>
        {this.props.heading}
        {this.props.content}
      </Responsive>
    )
  }
}
  
DesktopContainer.propTypes = {
  children: PropTypes.node,
}
  
class MobileContainer extends Component {
  state = { activeItem: window.location.pathname }

  handleItemClick = (e, { name }) =>  {
    this.setState({ 
      activeItem: name,
      sidebarOpened: !this.state.sidebarOpened
    })
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  render() {
    const { sidebarOpened, activeItem } = this.state

    return (
      <Responsive maxWidth = {766}>
        <Sidebar.Pushable>
          <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}  onClick={this.handleToggle}>
            <Menu.Item href="/" as='a' name='/' active={activeItem === '/'} onClick={this.handleItemClick} >Home</Menu.Item>
            <Menu.Item href="#" as='a' name='/gallery' active={activeItem === '/gallery'} onClick={this.handleItemClick} >Gallery</Menu.Item>
            <Menu.Item href="/resolutions" as='a' name='/resolutions' active={activeItem === '/resolutions'} onClick={this.handleItemClick} >Resolutions</Menu.Item>
            <Menu.Item href="#" as='a' name='/careers' active={activeItem === '/careers'} onClick={this.handleItemClick}>Careers</Menu.Item>
            <Menu.Item href="/about" as='a' name='/about' active={activeItem === '/about'} onClick={this.handleItemClick} >About</Menu.Item>
            <Menu.Item as='a'>Log in</Menu.Item>
          </Sidebar>

          <Sidebar.Pusher dimmed={sidebarOpened}  style={{ minHeight: '100vh' }}>
            <Segment inverted textAlign='center' style={{ padding: '0em 0em' }} vertical>
            {/* minHeight: 350, */}
              <Container>
                <Menu inverted pointing secondary size='large'>
                  <Menu.Item onClick={this.handleToggle}>
                    <Icon name='sidebar' />
                  </Menu.Item>
                  <Menu.Item position='right'>
                    {/* <Button as='a' inverted>Log in</Button> */}
                    {/* <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button> */}
                  </Menu.Item>
                </Menu>
              </Container>
            {this.props.heading}
            </Segment>      
          {this.props.content}
          </Sidebar.Pusher>
        </Sidebar.Pushable>
      </Responsive>
    )
  }
}
  
export class MainLayout extends Component {
  render() {
    let {content, heading} = this.props
    return (
      <div>
        <DesktopContainer heading={heading} content={content} />
        <MobileContainer heading={heading} content={content} />
      </div>
    )
  }
} 
