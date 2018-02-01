import React, { Component } from 'react';
// import { withTracker } from 'meteor/react-meteor-data';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

// App component - represents the whole app
export default class App extends Component {
  constructor(props) {
      super(props);
    
      this.state = {
        hideCompleted: false,
      };
  }

  render() {
      return (
      <div className="container">
        app skeleton for meteor - react
      </div>
      );
  }
}

