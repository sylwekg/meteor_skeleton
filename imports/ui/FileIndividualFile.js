import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Images from '../api/images';

export default class IndividualFile extends Component {
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
          <button onClick={ () => { this.props.onRename(this.props.fileId, this.props.fileName) }} className="btn btn-outline btn-primary btn-sm">
            Rename
          </button>
        </div>
        <div className="col-md-3">
          <a href={this.props.fileUrl} className="btn btn-outline btn-primary btn-sm"
             target="_blank">View</a>
        </div>
        <div className="col-md-2">
          <button onClick={ () => { this.props.onRemove(this.props.fileId) }} className="btn btn-outline btn-danger btn-sm">
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
  onRemove: PropTypes.func,
  onRename: PropTypes.func,
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  fileUrl: PropTypes.string,
  fileId: PropTypes.string.isRequired
}
