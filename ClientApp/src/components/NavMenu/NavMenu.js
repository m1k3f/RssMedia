import React, { Component } from 'react';
import { FaRssSquare, FaPlus, FaFileUpload, FaFileDownload, FaTrash, FaGithub } from 'react-icons/fa';

import FeedContext from '../context/FeedContext';
import { FeedLinkAdd } from '../FeedBar/FeedLinkAdd';
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

  renderFeedButtons = () => {
    let content = null;
    const { selectedFeed, feedLinksSettings } = this.context;
    if (feedLinksSettings.feedLinks.length > 0 && selectedFeed !== null) {
      let iconStyle = {
        width: '18px',
        height: '18px'        
      };

      let addIconStyle = {
        color: '#29a3a3',
        width: '18px',
        height: '18px'
      }

      content = (
        <div className={styles.headerButtonsCenter}>
          <div className={styles.divButtonCenter}>
            <FeedLinkAdd iconStyle={addIconStyle}>
              <div className={styles.divHeaderButtonCenter}>
                <FaPlus style={addIconStyle} title="Add Feed" />
              </div>
            </FeedLinkAdd>
          </div>
          <div className={styles.divButtonCenter}>
            <FeedImportButton iconStyle={iconStyle}>
              <div className={styles.divHeaderButtonCenter}>
                <FaFileUpload style={iconStyle} title="Import Feeds" />
              </div>
            </FeedImportButton>
          </div>
          <div className={styles.divButtonCenter}>
            <FeedExportButton iconStyle={iconStyle}>
              <div className={styles.divHeaderButtonCenter}>
                <FaFileDownload style={iconStyle} title="Export Feeds" />
              </div>
            </FeedExportButton>
          </div>
          <div className={styles.divButtonCenter}>
            <DeleteFeedsButton iconStyle={iconStyle}>
              <div className={styles.divHeaderButtonCenter}>
                <FaTrash style={iconStyle} title="Delete All Feeds" />
              </div>
            </DeleteFeedsButton>
          </div>
          {/* <div style={{width: '17px', height: '17px', margin: '5px'}} /> */}
        </div>
      );
    }

    return (content);
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
    // let helpIconStyle = {
    //   color: '#0044cc',
    //   fontSize: '30px'
    // };

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
        {this.renderFeedButtons()}        
        <div className={styles.headerButtonsRight}>
          {/* <button className={`${styles.headerHelpButton} ${styles.iconButton}`} onClick={this.handleHelpButtonClick} title="Help">
            <FaQuestionCircle style={helpIconStyle} />
          </button> */}
          <a className={styles.headerCodeLink} href="https://github.com/m1k3f/RssMedia" 
              target="_blank" rel="noopener noreferrer" title="View the Code!">
            <FaGithub style={githubIconStyle} />
          </a>
          {/* {this.renderHelpModal()} */}
        </div>        
      </header>
    );
  }
}
