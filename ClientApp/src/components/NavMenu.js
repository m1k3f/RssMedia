import React, { Component } from 'react';
// import './NavMenu.css';

export class NavMenu extends Component {

  render () {
    return (
      <header>
        <div>
          <i className="fas fa-rss-square fa-lg"></i>
          <p>RSS Reader</p>
        </div>
        <div>
          <a href="https://github.com/m1k3f/RssMedia" target="_blank">
              <i className="fab fa-github fa-2x"></i>
          </a>
        </div>
      </header>
    );
  }
}
