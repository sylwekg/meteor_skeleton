import React, {Component} from 'react';

export default class About extends Component {

    setVar() {
        // Session.set('test','Hello');
        Session.set('Meteor.loginButtons.dropdownVisible', true)
    }

    render() {
        
        return (
            <div>
                {/* <span> About placeholder => {Meteor.settings.public.test} </span> */}
                <button onClick={this.setVar} > Sign up </button>
            </div>
        );
    }
}