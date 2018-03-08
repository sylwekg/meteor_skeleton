import React, {Component} from 'react';
import FileApp from './FileApp';
import FileS3App from './FileS3App';
export default class Gallery extends Component {
  render() {
    return (
      <div>
        <br />
        <h3> Local server file storage </h3>
        <br />
        <FileApp /> 
        <br />  
        <h3> AWS S3 file storage </h3>
        <br />
        <FileS3App />
      </div>
    );
  }
}