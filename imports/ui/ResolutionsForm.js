import React, {Component} from 'react';

export default class ResolutionsForm extends Component {
    addResolution(event) {
        event.preventDefault();
        let text=this.refs.resolution.value.trim();
        if(text) {
            Meteor.call('resolutions.insert', text, (error, data)=> {
                if(error) {
                    Bert.alert('Please login before submitting','danger', 'fixed-top', 'fa-frown-o');
                } else {
                    this.refs.resolution.value=""
                }
            });            
        }

        
    }
  
    render() {
        return (
            <form className="new-resolutions" onSubmit={this.addResolution.bind(this)} >
                <input type="text" ref="resolution" placeholder="example: Finish React Meteor Series" />
            </form>
        );
    }
}