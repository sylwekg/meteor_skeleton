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

  render() {
      console.log(this.props.resolutions)
      let list = this.props.resolutions.map( (item, index) => {
        return <ResolutionSingle resolution={item} key={index} />
      })
      console.log("LIST: ",list)
      return (
      <div className="container">
        <h1> Home page </h1>
        <div>
            <ResolutionsForm /> 
            {/* <CSSTransitionGroup
                transitionName="example"
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}
            > */}
            { list.length > 0 && 
            <ul> {list} </ul> 
            }
            {/* </CSSTransitionGroup> */}
            <br />
            <h1> {Session.get('test')} </h1>


            <span> Lorem ipsum dolor sit amet enim. Etiam ullamcorper. Suspendisse a pellentesque dui, 
            non felis. Maecenas malesuada elit lectus felis, malesuada ultricies. Curabitur et ligula. 
            Ut molestie a, ultricies porta urna. Vestibulum commodo volutpat a, convallis ac, laoreet enim. 
            Phasellus fermentum in, dolor. Pellentesque facilisis. Nulla imperdiet sit amet magna. Vestibulum 
            dapibus, mauris nec malesuada fames ac turpis velit, rhoncus eu, luctus et interdum adipiscing wisi. 
            Aliquam erat ac ipsum. Integer aliquam purus. Quisque lorem tortor fringilla sed, vestibulum id, 
            eleifend justo vel bibendum sapien massa ac turpis faucibus orci luctus non, consectetuer lobortis 
            quis, varius in, purus. Integer ultrices posuere cubilia Curae, Nulla ipsum dolor lacus, suscipit 
            adipiscing. Cum sociis natoque penatibus et ultrices volutpat. Nullam wisi ultricies a, gravida vitae, 
            dapibus risus ante sodales lectus blandit eu, tempor diam pede cursus vitae, ultricies eu,
            faucibus quis, porttitor eros cursus lectus, pellentesque eget, bibendum a, gravida ullamcorper quam. 
            Nullam viverra consectetuer. Quisque cursus et, porttitor risus. Aliquam sem. In hendrerit nulla quam 
            nunc, accumsan congue. Lorem ipsum primis in nibh vel risus. Sed vel lectus. Ut sagittis, ipsum  
            </span>
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