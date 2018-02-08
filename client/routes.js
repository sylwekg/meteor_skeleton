import React from 'react';
import { mount } from 'react-mounter';
import {MainLayout} from '../imports/ui/MainLayout';
import App from '../imports/ui/App.js';
import About from '../imports/ui/About.js';

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