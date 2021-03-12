import React, { Component } from 'react';
import { FaRssSquare, FaQuestionCircle, FaGithub } from 'react-icons/fa';

import FeedContext from '../context/FeedContext';
import { FeedExportButton } from './controls/FeedExportButton';
import { FeedImportButton } from './controls/FeedImportButton';
import { DeleteFeedsButton } from './controls/DeleteFeedsButton';
import { HelpInfo } from '../modals/HelpInfo'
import styles from './NavMenu.module.css';

export class NavMenu extends Component {
  
  static contextType = FeedContext;

  state = {
    showHelpModal: false
  }

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

  handleHelpButtonClick = (e) => {
    this.setState({
      showHelpModal: true
    });
  }

  handleHelpInfoCallback = () => {
    this.setState({
        showHelpModal: false
    });
}

  renderHelpModal = () => {
    let content = null;
    if (this.state.showHelpModal) {
      content = (
        <HelpInfo helpInfoCallback={this.handleHelpInfoCallback} />
      );
    }

    return (content);
  }

  render () {
    let helpIconStyle = {
      color: '#0044cc',
      fontSize: '30px'
    };

    let githubIconStyle = {
      color: 'black',
      fontSize: '30px'
    }

    return (
      <header className={styles.header}>
        <div className={styles.headerTitle}>
          <FaRssSquare className={styles.headerTitleIcon} />
          <p className={styles.headerTitleText}>Feed Reader</p>
        </div>
        <div className={styles.headerButtonsCenter}>
          <FeedImportButton settingsCallback = {this.handleFeedButtonCallback} />                
          <FeedExportButton settingsCallback = {this.handleFeedButtonCallback} />
          <DeleteFeedsButton settingsCallback = {this.handleFeedButtonCallback} />
          <div style={{width: '17px', height: '17px', margin: '5px'}} />
        </div>
        <div className={styles.headerButtonsRight}>
          <button className={`${styles.headerHelpButton} ${styles.iconButton}`} onClick={this.handleHelpButtonClick} title="Help">
            <FaQuestionCircle style={helpIconStyle} />
          </button>
          <a className={styles.headerCodeLink} href="https://github.com/m1k3f/RssMedia" 
              target="_blank" rel="noopener noreferrer" title="View the Code!">
            <FaGithub style={githubIconStyle} />
          </a>
          {this.renderHelpModal()}
        </div>        
      </header>
    );
  }
}
