import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';
import { Settings } from './modals/Settings';

export class NavMenu extends Component {
  
  static contextType = FeedContext;

  state = {
    showSettingsModal: false,
    settings: {}
  }

  handleSettingsButtonClick = (e) => {
    this.setState({
      showSettingsModal: true
    });
  }

  handleSettingsCallback = (savedSettings) => {
    this.setState({
      showSettingsModal: false
    });

    if (savedSettings !== null) {
      const { setSettings, feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
      setSettings(savedSettings);
      saveAndRefreshFeedLinks(feedLinksSettings);
    }
  }

  renderSettingsModal = (show) => {
    let content = '';
    if (show) {
      const feedContext = this.context;
      let { settings } = feedContext.feedLinksSettings;
      content = (
        <Settings 
          defaultSettings = {settings}
          navMenuCallback = {this.handleSettingsCallback} />
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
