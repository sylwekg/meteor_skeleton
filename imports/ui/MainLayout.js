import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { Button, Container, Divider, Grid, Header, Icon, Image,
  List, Menu, Responsive, Segment, Sidebar, Visibility } from 'semantic-ui-react'
import AccountsUI from './AccountsUI';

//             <AccountsUI />

/* eslint-disable react/no-multi-comp */

class DesktopContainer extends Component {
    state = {}
  
    hideFixedMenu = () => this.setState({ fixed: false })
    showFixedMenu = () => this.setState({ fixed: true })
  
    render() {
      const { children } = this.props
      const { fixed } = this.state
  
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
                  <Menu.Item href="/" as='p'>Logo.pl</Menu.Item>
                  <Menu.Item href="/" as='a' active>Home</Menu.Item>
                  <Menu.Item as='a'>Work</Menu.Item>
                  <Menu.Item as='a'>Company</Menu.Item>
                  
                  <Menu.Item href='/about' as='a'>About</Menu.Item>
                  <Menu.Item position='right'>
                    <Button as='a' inverted={!fixed}>Log in</Button>
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
    state = {}
  
    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })
  
    render() {
      const { sidebarOpened } = this.state
  
      return (
        <Responsive maxWidth = {766}>
          <Sidebar.Pushable>
            <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened}>
              <Menu.Item href="/" as='a' active>Home</Menu.Item>
              <Menu.Item as='a'>Work</Menu.Item>
              <Menu.Item as='a'>Company</Menu.Item>
              <Menu.Item as='a'>Careers</Menu.Item>
              <Menu.Item href="/about" as='a'>About</Menu.Item>
              <Menu.Item as='a'>Log in</Menu.Item>
              <Menu.Item as='a'>Sign Up</Menu.Item>
            </Sidebar>
  
            <Sidebar.Pusher dimmed={sidebarOpened} onClick={this.handleToggle} style={{ minHeight: '100vh' }}>
              <Segment inverted textAlign='center' style={{ padding: '0em 0em' }} vertical>
              {/* minHeight: 350, */}
                <Container>
                  <Menu inverted pointing secondary size='large'>
                    <Menu.Item onClick={this.handleToggle}>
                      <Icon name='sidebar' />
                    </Menu.Item>
                    <Menu.Item position='right'>
                      <Button as='a' inverted>Log in</Button>
                      {/* <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button> */}
                    </Menu.Item>
                  </Menu>
                </Container>
                {/* <HomepageHeading  /> */}
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
