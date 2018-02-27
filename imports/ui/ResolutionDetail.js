import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Segment, Grid } from 'semantic-ui-react';

export default class ResolutionDetail extends Component {
  constructor(props) {
    super(props);  
  }

  render() {
    console.log(this.props.resolution)

    if(this.props.loading)
      return(<div>Loading...</div>)

    return (
      <div >
        <Segment style={{ padding: '4em 0em' }} vertical>
          <Grid container stackable verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={8}>
                <h2> Resolutions details: </h2>
                <p> {this.props.resolution.text} </p>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment >
      </div>
    );
  }
}

ResolutionDetail.propTypes  = {
    resolution: PropTypes.object,
}