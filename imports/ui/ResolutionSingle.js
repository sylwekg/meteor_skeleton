import React, {Component} from 'react';

export default class ResolutionSingle extends Component {

    toggleChecked = () => {
        console.log(this.props)
        Meteor.call('toggleResolution', this.props.resolution._id, this.props.resolution.complete)
    }

    deleteResolution = () => {
        Meteor.call('deleteResolution', this.props.resolution._id)
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
                {this.props.resolution.text}
                <button onClick={this.deleteResolution} > &times; </button>

            </li>
        );
    }
}