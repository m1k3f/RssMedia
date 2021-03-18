import React, { Component } from 'react';
import { FaPlus, FaFileUpload } from 'react-icons/fa';

import FeedContext from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';
import { HelpInfoMain } from './HelpInfoMain';
import { FeedLinkAdd } from './FeedBar/FeedLinkAdd';
import { FeedImportButton } from './NavMenu/controls/FeedImportButton';

import styles from './Content.module.css';

export class Content extends Component {

    static contextType = FeedContext;

    renderContent = () => {
        const { feedLinksSettings, selectedFeed, selectedFeedLoading } = this.context;
        let content = null;
        
        if (selectedFeed === null && !selectedFeedLoading) {            
            content = (
                <React.Fragment>
                    {this.renderButtons()}
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

    renderButtons = () => {
        let content = null;
        const { feedLinksSettings } = this.context;
        if (feedLinksSettings.feedLinks.length === 0) {
            content = (
                <div className={styles.divMainContentButtons}>                    
                    {this.renderAddButton()}
                    {this.renderImportButton()}
                </div>
            );
        }
        else {
            content = (
                <div className={styles.divMainContentButtons}>                    
                    {this.renderAddButton()}
                </div>
            );
        }

        return (content);
    }

    renderAddButton = () => {
        let addIconStyle = {    
            color: '#29a3a3',        
            width: '35px',
            height: '35px'
        };

        let content = (
            <FeedLinkAdd iconStyle={addIconStyle}>
                <div className={styles.divMainContentButton}>
                    <div style={{height: '50%'}}>
                        <FaPlus style={addIconStyle} />
                    </div>
                    <p className={styles.divMainContentButtonText}>Add Feed</p>
                </div>
            </FeedLinkAdd>
        );

        return (content);
    }

    renderImportButton = () => {
        let importIconStyle = {
            color: 'black',
            width: '35px',
            height: '35px'
        };

        let content = (
            <FeedImportButton iconStyle={importIconStyle}>
                <div className={styles.divMainContentButton}>
                    <div style={{height: '50%'}}>
                        <FaFileUpload style={importIconStyle} />
                    </div>
                    <p className={styles.divMainContentButtonText}>Import Feeds</p>
                </div>
            </FeedImportButton>
        );

        return (content);
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