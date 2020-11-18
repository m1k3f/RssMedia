import React, { Component } from 'react';
import { NavMenu } from './components/NavMenu';
import { Content } from './components/Content';
import './css/rssmedia.css';
import './css/animation.css'
import './css/fontawesome/all.min.css';

export default class App extends Component {

  render () {
    return (
      <div>        
          <NavMenu />
          <Content />
      </div>
    );
  }
}
