import React from 'react';
import { mount } from 'react-mounter';
import {MainLayout} from '../imports/ui/MainLayout';
import App from '../imports/ui/App.js';
import About from '../imports/ui/About.js';
import MainContent from '../imports/ui/MainContent';
import HomepageHeading from '../imports/ui/HomepageHeading';
import ResolutionDetailContainer from '../imports/ui/ResolutionDetailContainer.js';

FlowRouter.route('/', {
    name: 'index',
    action() {
        mount(MainLayout, {
            heading: (<HomepageHeading />),
            content: (<MainContent />)
        })
    }
});

FlowRouter.route('/about', {
    name: 'about',
    action() {
        mount(MainLayout, {
            // heading: (<HomepageHeading />),
            content: (<About />)
        })
    }
});

FlowRouter.route('/resolutions', {
    name: 'resolutions',
    action(params) {
        mount(MainLayout, {
            // heading: (<HomepageHeading />),
            content: (<App />)
        })
    }
});

FlowRouter.route('/resolutions/:id', {
    name: 'resolutions',
    action(params) {
        mount(MainLayout, {
            // heading: (<HomepageHeading />),
            content: (<ResolutionDetailContainer id={params.id} />)
        })
    }
});