import React, { Component } from 'react';

import FeedContext from '../context/FeedContext';
import { FeedExportButton } from './controls/FeedExportButton';
import { FeedImportButton } from './controls/FeedImportButton';
import { DeleteFeedsButton } from './controls/DeleteFeedsButton';
import { Settings } from './modals/Settings';

export class NavMenu extends Component {
  
  static contextType = FeedContext;

  // state = {
  //   showSettingsModal: false,
  //   settings: {}
  // }

  // handleSettingsButtonClick = (e) => {
  //   this.setState({
  //     showSettingsModal: true
  //   });
  // }

  // handleSettingsCallback = (settingsObject) => {
  //   this.setState({
  //     showSettingsModal: false
  //   });

  //   if (settingsObject !== null) {
  //     const { setSettings, feedLinksSettings, saveAndRefreshFeedLinks } = this.context;      
  //     setSettings(settingsObject.settings);
  //     saveAndRefreshFeedLinks(feedLinksSettings);
  //   }
  // }

  handleFeedButtonCallback = (option) => {
    const { setFeed, feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
    if (option.action === 'feedsImport') {        
      let feedLinkSettingsCopy = {...feedLinksSettings};
      
      feedLinkSettingsCopy.feedLinks.length = 0;
      option.newFeedLinks.forEach((newFeedLink) => {
          newFeedLink.position = (feedLinkSettingsCopy.feedLinks.length > 0) ? feedLinkSettingsCopy.feedLinks.length : 0;        
          feedLinkSettingsCopy.feedLinks.push(newFeedLink);
      });
      
      saveAndRefreshFeedLinks(feedLinkSettingsCopy);
    }
    else if (option.action === 'feedsExport') {

    }
    else if (option.action === 'feedsDelete') {
      let feedLinkSettingsCopy = {...feedLinksSettings};        
      feedLinkSettingsCopy.feedLinks.length = 0;
      saveAndRefreshFeedLinks(feedLinkSettingsCopy);
      setFeed(null);
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
        <div className="navFeedButtons">
          <FeedImportButton settingsCallback = {this.handleFeedButtonCallback} />                
          <FeedExportButton settingsCallback = {this.handleFeedButtonCallback} />
          <DeleteFeedsButton settingsCallback = {this.handleFeedButtonCallback} />
        </div>
        <div>
          {/* <button onClick={this.handleSettingsButtonClick}>
            <i className="fas fa-cog fa-2x"></i>
          </button> */}
          <a href="https://github.com/m1k3f/RssMedia" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-github fa-2x"></i>
          </a>
          {/* {this.renderSettingsModal(this.state.showSettingsModal)} */}
        </div>        
      </header>
    );
  }
}
