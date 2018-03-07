import React, {Component} from 'react';
import FileApp from './FileApp';
import FileS3App from './FileS3App';
export default class Gallery extends Component {
  render() {
    return (
      <div>
        <br />
        <br />
        <FileApp /> 
        <br />  
        <FileS3App />
      </div>
    );
  }
}