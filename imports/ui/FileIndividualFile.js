import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Item } from 'semantic-ui-react';
import Images from '../api/images';


export default class IndividualFile extends Component {
  removeFile = () => {
    "use strict";
    let conf = confirm('Are you sure you want to delete the file?') || false;
    if (conf == true) {
      Images.remove({_id: this.props.fileId}, function (error) {
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
    return (
      <Item >
        <Item.Image src='/images/square-image.png' />
        <Item.Content>
          <Item.Header>          
            <a href={this.props.fileUrl} 
                  target="_blank"><strong>{this.props.fileName}</strong></a></Item.Header>
          <Item.Meta>
            <span>Date</span>
            <span> Size: {this.props.fileSize} </span>
          </Item.Meta>
          <Item.Description>
            A description which may flow for several lines and give context to the content.
          </Item.Description>
          <Item.Extra>
              <Button primary floated='right' onClick={this.removeFile}>
                Delete
                <Icon name='right chevron' />
              </Button>
              <Button primary floated='right' onClick={this.renameFile}>
                Rename
                <Icon name='right chevron' />
              </Button>
            </Item.Extra>
        </Item.Content>        
      </Item>
  )}
}

IndividualFile.propTypes  = {
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  fileUrl: PropTypes.string,
  fileId: PropTypes.string.isRequired
}
