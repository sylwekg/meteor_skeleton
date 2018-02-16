import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import ResponsiveDrawer from './ResponsiveDrawer';

class ResponsiveDrawerContainer extends Component {

  render() {
      return (
        <ResponsiveDrawer content={this.props.content} header={this.props.header} />
    );
  }
}

export default withTracker(() => {
    return {
        header : Session.get("headerTitle"),
    };
  })(ResponsiveDrawerContainer);