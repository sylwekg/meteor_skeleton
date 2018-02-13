import React, {Component} from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import { Resolutions } from '../api/resolutions';
import ResolutionDetail from './ResolutionDetail';


export default ResolutionDetailContainer = withTracker(({ id }) => {
    const resolutionHandle = Meteor.subscribe('userResolutions');
    const loading = !resolutionHandle.ready();
    const resolution = Resolutions.findOne(id);

    console.log("checking db for : ",id)
    return {
        resolution,
        loading,

    };
  })(ResolutionDetail);