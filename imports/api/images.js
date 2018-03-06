import { Meteor }          from 'meteor/meteor';
import { FilesCollection } from 'meteor/ostrio:files';

const Images = new FilesCollection({
  debug: true,
  storagePath: '/assets/images',
  collectionName: 'Images',
  allowClientCode: true, // allow remove files from Client
  onBeforeUpload: function (file) {
    // Allow upload files under 10MB, and only in png/jpg/jpeg formats
    if (file.size <= 1024 * 1024 * 10 && /png|jpe?g/i.test(file.extension)) {
      return true;
    }
    console.log('file too big !!!')
    return 'Please upload image, with size equal or less than 10MB';
  },
  onBeforeRemove: function (cursor) {
    var records = cursor.fetch();
    var user = Meteor.userId();

    // console.log(">>>>>> records >>>>>", records);
    if(!user) {
      throw new Meteor.Error("Please login to remove file!");
      return false;
    }
    if (records && records.length) {
      if (user) {
        for (var i = 0, len = records.length; i < len; i++) {
          file = records[i];
          if (file.userId != user) {
            // Return false if at least one document is not owned by current user
            throw new Meteor.Error("You need to be the owner of the file")
            return false; 
          }
        }
      }
    }
    return true;
  }

});

if (Meteor.isServer) {
  Meteor.publish('files.images.all', function () {
    return Images.find().cursor;
  });
} 

export default Images;