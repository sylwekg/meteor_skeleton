import React, {Component} from 'react';
import { Input } from 'semantic-ui-react'

export default class ResolutionsForm extends Component {
    addResolution(event) {
        event.preventDefault();
        let text=this.refs.resolution.inputRef.value
        if(text) {
            Meteor.call('resolutions.insert', text, (error, data)=> {
                if(error) {
                    Bert.alert('Please login before submitting','danger', 'fixed-top', 'fa-frown-o');
                } else {
                    this.refs.resolution.inputRef.value=""
                }
            });            
        }

        
    }
  
    render() {
        return (
            <form className="new-resolutions" onSubmit={this.addResolution.bind(this)} >
                <Input
                    ref="resolution" 
                    icon='tags'
                    iconPosition='left'
                    label={{ tag: true, content: 'Add Resolution' }}
                    labelPosition='right'
                    placeholder='example: less shopping'
                />
            </form>
        );
    }
}