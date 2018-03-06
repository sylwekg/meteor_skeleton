import React, {Component} from 'react';
import FileApp from './FileApp';
import { Segment, Grid, List } from 'semantic-ui-react';

export default class Gallery extends Component {
  render() {
    return (
        <Segment style={{ padding: '2em 2em' }} vertical>
          <FileApp /> 
        </Segment >
    );
  }
}