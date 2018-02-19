import React, {Component} from 'react';

export default class About extends Component {
    componentWillMount() {
        Session.set('headerTitle','About');
    }

    setVar() {
        Session.set('Meteor.loginButtons.dropdownVisible', true)
    }

    render() {
        
        return (
            <div>
                <span> About placeholder => {Meteor.settings.public.test} </span>
                <button onClick={this.setVar} > Sign up </button>
            </div>
        );
    }
}