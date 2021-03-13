import React, { Component } from 'react';
import { FaChevronCircleDown, FaChevronCircleUp } from 'react-icons/fa';

import FeedContext from '../context/FeedContext';
import { FeedLink } from './FeedLink';
import styles from './FeedBar.module.css';

export class FeedLinks extends Component {
    
    state = {
        overflowVisible: false
    }

    static contextType = FeedContext;

    handleOverflowButtonClick = () => {
        if (this.state.overflowVisible) {
            this.feedsWrapper.classList.remove(styles.divFeedsExpanded);
            this.feedsWrapper.classList.add(styles.divFeedsHidden);
            this.setState({
                overflowVisible: false
            });
        }
        else {
            this.feedsWrapper.classList.remove(styles.divFeedsHidden);
            this.feedsWrapper.classList.add(styles.divFeedsExpanded);
            this.setState({
                overflowVisible: true
            });
        }
    }
        
    handleFeedLinkCallback = (existingFeedLink, droppedFeedLink) => {
        if (droppedFeedLink !== null) {
            this.reorderFeedLinks(existingFeedLink, droppedFeedLink);
        }
        else {
            this.editFeedLink(existingFeedLink);
        }
    }

    reorderFeedLinks = (existingFeedLink, droppedFeedLink) => {
        const originalFeedLink = {...existingFeedLink};
        let {feedLinksSettings, saveAndRefreshFeedLinks} = this.context;

        let existingFeedLinkIndex = feedLinksSettings.feedLinks.findIndex((link) => link.id === originalFeedLink.id);
        let droppedFeedLinkIndex = feedLinksSettings.feedLinks.findIndex((link) => link.id === droppedFeedLink.id);
        
        let dropLeft = (droppedFeedLinkIndex > existingFeedLinkIndex) ? true : false;
        let newArray = feedLinksSettings.feedLinks.map((savedLink, index) =>  {
            if (index === droppedFeedLinkIndex) {
                savedLink.position = originalFeedLink.position;
            }
            else if (index === existingFeedLinkIndex) {
                savedLink.position = (dropLeft) ? originalFeedLink.position + 1 : originalFeedLink.position - 1;                
            }            
            else if (dropLeft && (index > existingFeedLinkIndex && index < droppedFeedLinkIndex)) {
                savedLink.position = savedLink.position + 1;
            }
            else if (!dropLeft && (index < existingFeedLinkIndex && index > droppedFeedLinkIndex)) {
                savedLink.position = savedLink.position - 1;
            }

            return savedLink;
        });

        feedLinksSettings.feedLinks = newArray;
        
        saveAndRefreshFeedLinks(feedLinksSettings);
    }

    editFeedLink = (feedLink) => {
        const {feedLinksSettings, saveAndRefreshFeedLinks} = this.context;

        let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => 
                            link.id === feedLink.feedLinkId || link.id === feedLink.id);
        if (linkIndex > -1) {
            feedLinksSettings.feedLinks[linkIndex] = feedLink;
            saveAndRefreshFeedLinks(feedLinksSettings);
        }
    }

    renderFeedLinks = () => {
        let feedLinks = this.props.links;
        let content = '';        
        if (feedLinks.length > 0) {
            content = feedLinks.map((link) => {
                return (
                    <FeedLink 
                        key = {link.id} 
                        linkData = {link} 
                        feedLinksCallback = {this.handleFeedLinkCallback}
                    />
                );
            });
        }

        return (content);
    }

    render() {
        let buttonIcon = null;
        let iconStyle = {
            width: '18px',
            height: '18px'
        };

        if (this.state.overflowVisible) {
            buttonIcon = <FaChevronCircleUp style={iconStyle} />
        }
        else {
            buttonIcon = <FaChevronCircleDown style={iconStyle} />
        }

        return(
            <div className={styles.divFeedLinks}>
                <div className={`${styles.divFeedsWrapper} ${styles.divFeedsHidden}`} 
                        ref={el => this.feedsWrapper = el}>
                    <div className={`fade-in ${styles.divFeeds}`}>
                        {this.renderFeedLinks()}                    
                    </div>                    
                </div>
                <button className={`${styles.divFeedLinksButton} ${styles.iconButton}`} 
                        onClick={this.handleOverflowButtonClick}>
                    {buttonIcon}
                </button>
            </div>
        );
    }
}