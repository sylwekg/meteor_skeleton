import { Meteor } from 'meteor/meteor';
import '../imports/api/resolutions.js';



Meteor.startup(() => {
  // code to run on server at startup
  console.log(Meteor.settings.private.ptest)
});
