import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ResolutionDetail extends Component {
    constructor(props) {
        super(props);  
    }
    componentWillMount() {
        Session.set('headerTitle','Resolution details');
    }
    render() {
        console.log(this.props.resolution)

        if(this.props.loading)
            return(<div>Loading...</div>)

        return (
            <div> resolutions detail placeholder 
                <h1> {this.props.resolution.text} </h1>
            </div>
        );
    }
}

ResolutionDetail.propTypes  = {
    resolution: PropTypes.object,
}