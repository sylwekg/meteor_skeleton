import { ReactMeteorData } from 'meteor/react-meteor-data';
import { withTracker } from 'meteor/react-meteor-data';
import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import IndividualFile from './FileIndividualFile';
import { _ } from 'meteor/underscore';
import { Collections } from '../lib/core.js';

class FileS3App extends Component {
  constructor(props) {
      super(props);
      
      this.state = {
        uploading: [],
        progress: 0,
        inProgress: false,
      };
  }

  onRemoveFile = ( fileId ) => {
    "use strict";
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      Meteor.call('s3.storage.remove',fileId, (err, res) => {
        if (typeof err !== 'undefined') {
          Bert.alert(err,'danger', 'fixed-top', 'fa-frown-o');
          console.error("Error: "+ err);          
        }
        if (res)
          console.log("RES: ",res)
      });
    }
  }

  onRenameFile = (fileId, fileName) => {
    "use strict";
    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('New file name?', fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('s3.storage.rename', fileId, prompt, function (err, res) {
        if (err)
          console.log(err);
        if (res)
          console.log(res);
      });
    }
  }

  uploadIt = (e) => {
    "use strict";
    e.preventDefault();

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance = Collections.userFiles.insert({
          file: file,
          meta: {
            locator: this.props.fileLocator,
            userId: Meteor.userId() // Optional, used to check on server for file tampering
          },
          streams: 'dynamic',
          chunkSize: 'dynamic',
          allowWebWorkers: true // If you see issues with uploads, change this to false
        }, false);

        this.setState({
          uploading: uploadInstance, // Keep track of this instance to use below
          inProgress: true // Show the progress bar now
        });

        // These are the event functions, don't need most of them, it shows where we are in the process
        uploadInstance.on('start', () => {
          console.log('Starting');
        });

        uploadInstance.on('end',  (error, fileObj) => {
          console.log('On end File Object: ', fileObj);
        });

        uploadInstance.on('uploaded',  (error, fileObj) => {
          console.log('uploaded: ', fileObj);

          // Remove the filename from the upload box
          this.refs['fileinput'].value = '';

          // Reset our state for the next file
          this.setState({
            uploading: [],
            progress: 0,
            inProgress: false
          });
        });

        uploadInstance.on('error',  (error, fileObj) => {
          Bert.alert(error, 'danger', 'fixed-top', 'fa-frown-o');
          console.log('Error during upload: ' + error);
        });

        uploadInstance.on('progress',  (progress, fileObj) => {
          console.log('Upload Percentage: ' + progress);
          // Update our progress bar
          this.setState({
            progress: progress
          })
        });

        uploadInstance.start(); // Must manually start the upload
      }
    }
  }

  // This is our progress bar, bootstrap styled
  // Remove this function if not needed
  showUploads = () => {
    console.log('**********************************', this.state.uploading);

    if (!_.isEmpty(this.state.uploading)) {
      return <div>
        {this.state.uploading.file.name}

        <div className="progress progress-bar-default">
          <div style={{width: this.state.progress + '%'}} aria-valuemax="100"
             aria-valuemin="0"
             aria-valuenow={this.state.progress || 0} role="progressbar"
             className="progress-bar">
            <span className="sr-only">{this.state.progress}% Complete (success)</span>
            <span>{this.state.progress}%</span>
          </div>
        </div>
      </div>
    }
  }

  render() {
    if (this.props.docsReadyYet) {
      'use strict';

      let fileCursors = this.props.docs;

      // Run through each file that the user has stored
      // (make sure the subscription only sends files owned by this user)
      let display = fileCursors.map((aFile, key) => {
        // console.log("a file: ",aFile);
        let link = Collections.userFiles.findOne({_id: aFile._id}).link();  //The "view/download" link
        // console.log('LINK:',link)
        // Send out components that show details of each file
        return <div key={'file' + key}>
        <IndividualFile
            onRemove = {this.onRemoveFile}
            onRename = {this.onRenameFile}
            fileName = {aFile.name}
            fileUrl = {link}
            fileId = {aFile._id}
            fileSize = {aFile.size}
          />  
        </div>
      });

      return <div>
        <div className="row">
          <div className="col-md-12">
            <p>Upload New File:</p>
            <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
                 onChange={this.uploadIt}/>
          </div>
        </div>

        <div className="row m-t-sm m-b-sm">
          <div className="col-md-6">

            {this.showUploads()}

          </div>
          <div className="col-md-6">
          </div>
        </div>

        {display}

      </div>
    }
    else return <div> loading ...</div>
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('filesS3.images.all');
  return {
    docsReadyYet: handle.ready(),
    docs: Collections.userFiles.find().fetch() // Collection is Collections.userFiles
  };
})(FileS3App);
