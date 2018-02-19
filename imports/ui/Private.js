import React, {Component} from 'react';

export default class Private extends Component {
    componentWillMount() {
        Session.set('headerTitle','Private');
    }

    setVar() {
        Session.set('Meteor.loginButtons.dropdownVisible', true)
    }

    render() {
        
        return (
            <div>
                <span> Private placeholder => {Meteor.settings.public.test} </span>
                <button onClick={this.setVar} > Sign up </button>
            </div>
        );
    }
}