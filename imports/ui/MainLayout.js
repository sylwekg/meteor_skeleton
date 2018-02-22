import React, { Component } from 'react';
import AccountsUI from './AccountsUI';
import { Container, Sidebar, Segment, Button, Menu, Image, Icon, Header } from 'semantic-ui-react'
import { Responsive } from 'semantic-ui-react';

class SidebarLeftPush extends Component {
    render() {
      return (
        <Responsive  maxWidth={768}>     
          <Sidebar.Pushable as={Segment}>
            <Sidebar as={Menu} animation='push' width='thin' visible={this.props.visible} icon='labeled' vertical inverted>
              <Menu.Item name='home' href='/' >
                <Icon name='home' />
                Home
              </Menu.Item>
              <Menu.Item name='gamepad'>
                <Icon name='gamepad' />
                Games
              </Menu.Item>
              <Menu.Item name='camera'>
                <Icon name='camera' />
                Channels
              </Menu.Item>
            </Sidebar>
            <Sidebar.Pusher>
              <Segment basic>
                {this.props.content}
              </Segment>
            </Sidebar.Pusher>
          </Sidebar.Pushable>
        </Responsive>
        )
    }
}

export class MainLayout extends Component {
    state = { 
        activeItem: 'home',
        visible: false
    };
  
    toggleVisibility = () => this.setState({ visible: !this.state.visible });

    handleItemClick = (e, { name }) => {
        this.setState({ activeItem: name });
    };

    render() {
        const { activeItem } = this.state

        return(
            <div className="main-layout">
            <header>
                <Menu icon inverted style={{ padding: '1em 1em' }}  >
                    <Responsive  maxWidth={768} > 
                        <Button 
                            style={{background:'none', padding: '0em'  }}
                            size='small' 
                            onClick={this.toggleVisibility}
                            >
                                <Icon inverted name='bars' size='large' />
                        </Button>
                    </Responsive> 
                    <Menu.Header> <h2> <a href="/"> My Resolutions </a> </h2> </Menu.Header>
                    <Responsive  minWidth={769} style={{ position: 'absolute', right: '0px' }}> 
                        <Menu.Menu position='right' >
                               
                            <Menu.Item href='/' name='home' active={activeItem === 'home'} onClick={this.handleItemClick} />
                            <Menu.Item name='messages' active={activeItem === 'messages'} onClick={this.handleItemClick} />
                            <Menu.Item name='friends' active={activeItem === 'friends'} onClick={this.handleItemClick} />
                            <Menu.Item href='/about' name='about' active={activeItem === 'about'} onClick={this.handleItemClick} />
                            <Menu.Item>  <AccountsUI /> </Menu.Item>
                                
                        </Menu.Menu>
                   </Responsive >
                </Menu>
            </header>
            <main>
                <Responsive  minWidth={769}>
                <Container>
                    {this.props.content}
                </Container>
                </Responsive>
                <SidebarLeftPush content={this.props.content} visible={this.state.visible} />  
            </main>
            </div>  
        );
    }
}

