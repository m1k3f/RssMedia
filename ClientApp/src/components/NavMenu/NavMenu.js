import React, { Component } from 'react';
import { Settings } from './modals/Settings';

export class NavMenu extends Component {
  
  state = {
    showSettingsModal: false
  }

  handleSettingsButtonClick = (e) => {
    this.setState({
      showSettingsModal: true
    });
  }

  renderSettingsModal = (show) => {
    let content = '';
    if (show) {
      content = (
        <Settings />
      );
    }

    return content;
  }

  render () {
    return (
      <header>
        <div>
          <i className="fas fa-rss-square fa-lg"></i>
          <p>Feed Reader</p>
        </div>
        <div>
          <button onClick={this.handleSettingsButtonClick}>
            <i className="fas fa-cog fa-2x"></i>
          </button>
          <a href="https://github.com/m1k3f/RssMedia" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-2x"></i>
          </a>
          {this.renderSettingsModal(this.state.showSettingsModal)}
        </div>        
      </header>
    );
  }
}
