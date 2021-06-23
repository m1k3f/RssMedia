import React, { Component } from 'react';
import { FaPlus, FaFileUpload, FaFileDownload, FaTrash, FaFileAlt } from 'react-icons/fa';

import FeedContext from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';
import { FeedLinkAdd } from './FeedBar/FeedLinkAdd';
import { FeedImportButton } from './NavMenu/controls/FeedImportButton';
import { FeedExportButton } from './NavMenu/controls/FeedExportButton';
import { DeleteFeedsButton } from './NavMenu/controls/DeleteFeedsButton';

import styles from './Content.module.css';

export class Content extends Component {

    static contextType = FeedContext;    

    renderContent = () => {
        const { selectedFeed, selectedFeedLoading } = this.context;
        let content = null;
        
        if (selectedFeed === null && !selectedFeedLoading) {

            let iconStyle = {
                color: 'black',
                width: '30px',
                height: '30px'
            };
        
            let spinnerStyle = {
                width: '30px',
                height: '30px',
                margin: '0 40px 24px 40px'
            };

            content = (
                <React.Fragment>
                    <div className={styles.divMainContentButtons}>
                        <div className={styles.contentButtonsFirstRow}>
                            <FeedLinkAdd iconStyle={spinnerStyle}>
                                <div className={styles.divMainContentButton}>
                                    <div style={{height: '50%'}}>
                                        <FaPlus style={iconStyle} />
                                    </div>
                                    <p className={styles.divMainContentButtonText}>Add Feed</p>
                                </div>
                            </FeedLinkAdd>
                            <FeedImportButton iconStyle={spinnerStyle} isSample={false}>
                                <div className={styles.divMainContentButton}>
                                    <div style={{height: '50%'}}>
                                        <FaFileUpload style={iconStyle} />
                                    </div>
                                    <p className={styles.divMainContentButtonText}>Import Feeds</p>
                                </div>
                            </FeedImportButton>
                            <FeedExportButton iconStyle={spinnerStyle}>
                                <div className={styles.divMainContentButton}>
                                    <div style={{height: '50%'}}>
                                        <FaFileDownload style={iconStyle} />
                                    </div>
                                    <p className={styles.divMainContentButtonText}>Export Feeds</p>
                                </div>
                            </FeedExportButton>
                            <DeleteFeedsButton iconStyle={spinnerStyle}>
                                <div className={styles.divMainContentButton}>
                                    <div style={{height: '50%'}}>
                                        <FaTrash style={iconStyle} />
                                    </div>
                                    <p className={styles.divMainContentButtonText}>Delete Feeds</p>
                                </div>
                            </DeleteFeedsButton>
                        </div>
                        {this.renderSecondRowButtons(iconStyle, spinnerStyle)}
                    </div>                    
                </React.Fragment>
            );
        }
        else {
            content = (
                <FeedArticles />
            );
        }

        return (content);
    }

    renderSecondRowButtons = (iconStyle, spinnerStyle) => {
        let content = null;
        const { feedLinksSettings } = this.context;

        if (feedLinksSettings.feedLinks.length === 0) {
            content = (
                <div className={styles.contentButtonsSecondRow}>
                    <FeedImportButton iconStyle={spinnerStyle} isSample={true}>
                        <div className={styles.divMainContentButton}>
                            <div style={{height: '50%'}}>
                                <FaFileAlt style={iconStyle} />                                
                            </div>
                            <p className={styles.divMainContentButtonText}>Add Sample Feeds</p>
                        </div>
                    </FeedImportButton>
                </div>
            );
        }

        return content;
    }

    render() {
        return (
            <main className={styles.mainContent}>
                <FeedBar />
                {this.renderContent()}
            </main>
        );
    }
}