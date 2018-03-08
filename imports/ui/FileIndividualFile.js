import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Icon, Button, Item } from 'semantic-ui-react';

export default class IndividualFile extends Component {
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
            <Button primary floated='right' onClick={() => { this.props.onRemove(this.props.fileId) }}>
              Delete
              <Icon name='right chevron' />
            </Button>
            <Button primary floated='right' onClick={() => { this.props.onRename(this.props.fileId, this.props.fileName) }}>
              Rename
              <Icon name='right chevron' />
            </Button>
            </Item.Extra>
        </Item.Content>        
      </Item>
  )}
}

IndividualFile.propTypes  = {
  onRemove: PropTypes.func,
  onRename: PropTypes.func,
  fileName: PropTypes.string.isRequired,
  fileSize: PropTypes.number.isRequired,
  fileUrl: PropTypes.string,
  fileId: PropTypes.string.isRequired
}
