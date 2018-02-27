import React, {Component} from 'react';
import { Button, List, Checkbox } from 'semantic-ui-react'

export default class ResolutionSingle extends Component {

    toggleChecked = () => {
        console.log(this.props)
        Meteor.call('toggleResolution', this.props.resolution)
    }

    deleteResolution = () => {
        Meteor.call('deleteResolution', this.props.resolution, (error, data)=> {
            if(error) {
                Bert.alert('Please login to delete','danger', 'fixed-top', 'fa-frown-o');
            } 
        });
    }
  
    render() {
        return (
            <List.Item >
                <List.Content floated='right'>
                    <Button onClick={this.deleteResolution} >Remove</Button>
                </List.Content>
                <Checkbox 
                    checked = {this.props.resolution.complete} 
                    onClick = {this.toggleChecked}  
                    />
                <a href={`/resolutions/${this.props.resolution._id}`}>  {this.props.resolution.text} </a>
            </List.Item>
        );
    }
}