import React, { Component } from 'react';
import { FaSyncAlt } from 'react-icons/fa';

import FeedContext from '../../context/FeedContext';
import styles from './FeedArticleControls.module.css';

export class SyncButton extends Component {

    state = {
        spin: false
    }

    static contextType = FeedContext;

    handleSyncClick = async (e) => {
        const {feedLinksSettings} = this.context;
        this.animateButton(true);        
        
        await this.wait(2000);

        let feedLinkId = this.props.selectedFeed.feedLinkId;
        let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => link.id === feedLinkId);
        let feedLink = null;
        if (linkIndex > -1) {
            feedLink = feedLinksSettings.feedLinks[linkIndex];
        }

        let option = {
            action: 'sync',
            feedLink: feedLink
        };

        this.props.controlsCallback(option);        
        
        this.animateButton(false);
    }

    animateButton = (spin) => {
        this.setState({
            spin: spin
        });
    }

    wait = async (milliseconds) => {
        await new Promise(r => setTimeout(r, milliseconds));
    }

    render() {
        let articlesExist = (this.props.selectedFeed != null && this.props.selectedFeed.feedArticles != null);
        let buttonClass = articlesExist ? styles.controlsButton : styles.controlsButtonRight;
        let iconClass = articlesExist ? styles.controlsButtonIcon : styles.controlsButtonIconRight;

        let iconSync = (this.state.spin) ? 
                        <FaSyncAlt className={`${iconClass} spin`} /> : 
                        <FaSyncAlt className={iconClass} />;        

        return(
            <button className={`${styles.iconButton} ${buttonClass}`} 
                    onClick={this.handleSyncClick} title="Refresh Articles">
                {iconSync}
            </button>
        );
    }
}