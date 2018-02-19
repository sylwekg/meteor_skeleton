import React from 'react';
import { mount } from 'react-mounter';
import {MainLayout} from '../imports/ui/MainLayout';
import App from '../imports/ui/App.js';
import About from '../imports/ui/About.js';
import NotFound from '../imports/ui/NotFound.js';
import ResolutionDetailContainer from '../imports/ui/ResolutionDetailContainer.js';

FlowRouter.route('/', {
    name: 'index',
    action() {
        mount(MainLayout, {
            content: (<App />)
        })
        console.log("index")
    }
});

FlowRouter.route('/about', {
    name: 'about',
    action() {
        mount(MainLayout, {
            content: (<About />)
        })
    }
});

FlowRouter.route('/resolutions/:id', {
    name: 'resolutions',
    action(params) {
        mount(MainLayout, {
            content: (<ResolutionDetailContainer id={params.id} />)
        })
    }
});

FlowRouter.route("/logout", {
    name: "logout",
    action() {
      Meteor.logout(() => {
        FlowRouter.redirect("/");
      });
    }
  });


FlowRouter.route("/private", {
    name: "private",
    // triggersEnter: [AccountsTemplates.ensureSignedIn], // force login
    action() {
        mount(MainLayout, {
            content: (<Private />)
        })
    }
});


FlowRouter.notFound = {
    action() {
        mount(MainLayout, {
            content: (<NotFound />)
        })
    }
};