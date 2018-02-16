import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Resolutions } from '../api/resolutions';
import { withTracker } from 'meteor/react-meteor-data';
import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';

import { CSSTransitionGroup } from 'react-transition-group'

// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hideCompleted: false,
        };
  }

  componentWillMount() {
    Session.set('headerTitle','Main Page');
  }


  render() {
      console.log(this.props.resolutions)
      let list = this.props.resolutions.map( (item, index) => {
        return <ResolutionSingle resolution={item} key={index} />
      })
      console.log("LIST: ",list)
      return (
      <div className="container">
        <h1> My Resolutions </h1>
        <div>
            <ResolutionsForm /> 
            <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            >
            { list.length > 0 && 
            <ul> {list} </ul> 
            }
            </CSSTransitionGroup>
            <br />
            <h1> {Session.get('test')} </h1>
        </div>
      </div>
      );
  }
}

export default withTracker(() => {
    Meteor.subscribe('userResolutions');
  
    return {
        resolutions: Resolutions.find({} ).fetch(),

    };
  })(App);