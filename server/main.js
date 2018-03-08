import { Meteor } from 'meteor/meteor';
import '../imports/api/resolutions.js';
import '../imports/api/images.js';
import '../imports/server/s3.file.store.js';


Meteor.startup(() => {
  // code to run on server at startup
  // console.log(Meteor.settings.private.ptest)
});
