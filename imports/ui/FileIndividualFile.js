import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Images from '../api/images';
import { Collections } from '../lib/core.js';

export default class IndividualFile extends Component {
  removeFile = () => {
    "use strict";
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      Collections.userFiles.remove({_id: this.props.fileId}, function (error) {
        if (error) {
          Bert.alert(error,'danger', 'fixed-top', 'fa-frown-o');
          console.error("File wasn't removed, error: " + error)
        } else {
          console.info("File successfully removed");
        }
      });
    }
  }

  renameFile = () => {
    "use strict";

    let validName = /[^a-zA-Z0-9 \.:\+()\-_%!&]/gi;
    let prompt    = window.prompt('New file name?', this.props.fileName);

    // Replace any non valid characters, also do this on the server
    if (prompt) {
      prompt = prompt.replace(validName, '-');
      prompt.trim();
    }

    if (!_.isEmpty(prompt)) {
      Meteor.call('RenameFile', this.props.fileId, prompt, function (err, res) {
        if (err)
          console.log(err);
      });
    }
  }

  render() {
    return <div className="m-t-sm">
      <div className="row">
        <div className="col-md-12">
          <strong>{this.props.fileName}</strong>
          <div className="m-b-sm">
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-md-3">
          <button onClick={this.renameFile} className="btn btn-outline btn-primary btn-sm">
            Rename
          </button>
        </div>


        <div className="col-md-3">
          <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
             target="_blank">View</a>
        </div>

        <div className="col-md-2">
          <button onClick={this.removeFile} className="btn btn-outline btn-danger btn-sm">
            Delete
          </button>
        </div>

        <div className="col-md-4">
          Size: {this.props.fileSize}
        </div>
      </div>
    </div>
  }
}

IndividualFile.propTypes  = {
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  fileUrl: PropTypes.string,
  fileId: PropTypes.string.isRequired
}
