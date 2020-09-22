import React, { Component } from 'react';
import { NavMenu } from './components/NavMenu';
import { Content } from './components/Content';
import './css/rssmedia.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <div>
        <NavMenu />
        <Content />
      </div>
    );
  }
}
