import React, {Component} from 'react';

export default class ResolutionsForm extends Component {
    addResolution(event) {
        event.preventDefault();
        let text=this.refs.resolution.value.trim();
        Meteor.call('resolutions.insert', text, ()=> {
            this.refs.resolution.value=""
        });
        
    }
  
    render() {
        return (
            <form className="new-resolutions" onSubmit={this.addResolution.bind(this)} >
                <input type="text" ref="resolution" placeholder="example: Finish React Meteor Series" />
            </form>
        );
    }
}