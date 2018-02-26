import PropTypes from 'prop-types'
import React, { Component } from 'react'
import {  Image } from 'semantic-ui-react'

export default class HomepageHeading extends Component {
    render() {
        return(
            <div className="hero-image">
            <Image src='/images/background.jpg' fluid />
            <div className="hero-text">
              <h1>I am John Doe</h1>
              <p>And I'm a Photographer</p>
              <h1>Hire me</h1>
            </div>
          </div>
        )
    }
}  