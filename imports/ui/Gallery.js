import React, {Component} from 'react';
import { Segment } from 'semantic-ui-react';
import FileApp from './FileApp';
import FileS3App from './FileS3App';

export default class Gallery extends Component {
  render() {
    return (
      <div>
        <Segment style={{ padding: '2em 2em' }} vertical>
          <FileApp /> 
        </Segment >
        <Segment style={{ padding: '2em 2em' }} vertical>
          <FileS3App /> 
        </Segment >
      </div>
    );
  }
}
