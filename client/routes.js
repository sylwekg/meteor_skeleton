import React from 'react';
import { mount } from 'react-mounter';
import {MainLayout} from '../imports/ui/MainLayout';
import App from '../imports/ui/App.js';

FlowRouter.route('/', {
    name: 'index',
    action() {
        mount(MainLayout, {
            content: (<App />)
        })
        console.log("index")
    }
});

