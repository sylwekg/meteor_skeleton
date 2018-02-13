import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Resolutions } from '../api/resolutions';
import { withTracker } from 'meteor/react-meteor-data';
import ResolutionsForm from './ResolutionsForm';
import ResolutionSingle from './ResolutionSingle';
// App component - represents the whole app
class App extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            hideCompleted: false,
        };
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
            { list.length > 0 && 
            <ul> {list} </ul> 
            }
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