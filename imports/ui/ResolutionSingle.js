import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

    toggleChecked = () => {
        console.log(this.props)
        Meteor.call('toggleResolution', this.props.resolution)
    }

    deleteResolution = () => {
        Meteor.call('deleteResolution', this.props.resolution)
    }
  
    render() {
        return (
            <li>
                <input 
                    type = "checkbox" 
                    readOnly = {true} 
                    checked={this.props.resolution.complete} 
                    onClick = {this.toggleChecked} 
                />
                <a href={`/resolutions/${this.props.resolution._id}`}>  {this.props.resolution.text} </a>
                <button onClick={this.deleteResolution} > &times; </button>

            </li>
        );
    }
}