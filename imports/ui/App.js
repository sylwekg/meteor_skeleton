import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { Segment, Grid, List } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import { CSSTransitionGroup } from 'react-transition-group'
import { Resolutions } from '../api/resolutions';
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
      <div >
        <Segment style={{ padding: '4em 0em' }} vertical>
            <Grid container stackable verticalAlign='middle'>
                <Grid.Row>
                    <Grid.Column width={8}>
                        <h2> My Resolutions </h2>
                        <div>
                            <ResolutionsForm /> 
                            {/* <CSSTransitionGroup
                                transitionName="example"
                                transitionEnterTimeout={500}
                                transitionLeaveTimeout={300}
                            > */}
                            { list.length > 0 && 
                            <List divided verticalAlign='middle'> {list} </List> 
                            }
                            {/* </CSSTransitionGroup> */}
                            <br />
                            <h1> {Session.get('test')} </h1>
                        </div>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </Segment >
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