import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { ReactMeteorData } from 'meteor/react-meteor-data';
import { withTracker } from 'meteor/react-meteor-data';
import { Item, Progress, Grid, Segment } from 'semantic-ui-react'
import { _ } from 'meteor/underscore';
import IndividualFile from './FileIndividualFile';
import Images from '../api/images';

class FileApp extends Component {
  constructor(props) {
      super(props);
      
      this.state = {
        uploading: [],
        progress: 0,
        inProgress: false,
      };
  }

  uploadIt = (e) => {
    "use strict";
    e.preventDefault();

    if (e.currentTarget.files && e.currentTarget.files[0]) {
      // We upload only one file, in case
      // there was multiple files selected
      var file = e.currentTarget.files[0];

      if (file) {
        let uploadInstance = Images.insert({
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
        let link = Images.findOne({_id: aFile._id}).link();  //The "view/download" link
        // console.log('LINK:',link)
        // Send out components that show details of each file
        return <IndividualFile 
          key={'file' + key} 
          fileName={aFile.name} 
          fileUrl={link} 
          fileId={aFile._id} 
          fileSize={aFile.size} /> 
      });

      return <div>
        <Grid container columns={2} stackable stretched>
          <Grid.Column floated='left'>
            <label htmlFor="fileinput" className="custom-file-upload">
                Upload new file
            </label>
            <input type="file" id="fileinput" disabled={this.state.inProgress} ref="fileinput"
                  onChange={this.uploadIt}/>
          </Grid.Column>
          <Grid.Column floated='left'>
            <Progress percent={this.state.progress}  progress="percent" autoSuccess />
          </Grid.Column>
        </Grid>
          {/* {this.showUploads()} */}
        
        <Item.Group divided>
          {display}
        </Item.Group>
      </div>
    }
    else return <div> loading ...</div>
  }
}

export default withTracker(() => {
  const handle = Meteor.subscribe('files.images.all');
  return {
    docsReadyYet: handle.ready(),
    docs: Images.find().fetch() // Collection is Images
  };
})(FileApp);
