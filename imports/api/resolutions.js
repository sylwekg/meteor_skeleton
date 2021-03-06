import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Resolutions = new Mongo.Collection('resolutions');
if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish('resolutions', function resolutionsPublication() {
        return Resolutions.find({});
    });

    Meteor.publish('userResolutions', function resolutionsPublication() {
        return Resolutions.find({user: this.userId});
    });

  }

Meteor.methods({
    'resolutions.insert'(text) {
        if(!Meteor.userId())
            throw new Meteor.Error("not-authorized");
        check(text, String);
        Resolutions.insert({
          text,
          complete: false,
          createdAt: new Date(),
          user: Meteor.userId(),
          });
    },
    'toggleResolution'(resolution) {
        check(resolution._id, String);

        if(Meteor.userId() !== resolution.user)
            throw new Meteor.Error('not-authorized');

        Resolutions.update(resolution._id, {
            $set: {complete: !resolution.complete}
        })
    },
    'deleteResolution'(resolution) {
        check(resolution._id, String);

        if(Meteor.userId() !== resolution.user)
            throw new Meteor.Error('not-authorized');

        Resolutions.remove(resolution._id)
    }
})

// if (Meteor.isServer) {
//     // This code only runs on the server
//     Meteor.publish('tasks', function tasksPublication() {
//         return Tasks.find({
//         $or: [
//             { private: { $ne: true } },
//             { owner: this.userId },
//         ],
//         });
//     });
//   }


// Meteor.methods({
//   'tasks.insert'(text) {
//     check(text, String);
 
//     // Make sure the user is logged in before inserting a task
//     if (! this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
 
//     Tasks.insert({
//       text,
//       createdAt: new Date(),
//       owner: this.userId,
//       username: Meteor.users.findOne(this.userId).username,
//     });
//   },
//   'tasks.remove'(taskId) {
//     check(taskId, String);
//     const task = Tasks.findOne(taskId);
//     if (task.private && task.owner !== this.userId) {
//       // If the task is private, make sure only the owner can delete it
//       throw new Meteor.Error('not-authorized');
//     }
//     Tasks.remove(taskId);
//   },
//   'tasks.setChecked'(taskId, setChecked) {
//     check(taskId, String);
//     check(setChecked, Boolean);
//     const task = Tasks.findOne(taskId);
//     if (task.private && task.owner !== this.userId) {
//       // If the task is private, make sure only the owner can check it off
//       throw new Meteor.Error('not-authorized');
//     } 
//     Tasks.update(taskId, { $set: { checked: setChecked } });
//   },
//   'tasks.setPrivate'(taskId, setToPrivate) {
//     check(taskId, String);
//     check(setToPrivate, Boolean);
 
//     const task = Tasks.findOne(taskId);
 
//     // Make sure only the task owner can make a task private
//     if (task.owner !== this.userId) {
//       throw new Meteor.Error('not-authorized');
//     }
 
//     Tasks.update(taskId, { $set: { private: setToPrivate } });
//   },
// });