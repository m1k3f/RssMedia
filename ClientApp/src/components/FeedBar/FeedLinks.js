import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';
import { FeedLink } from './FeedLink';

export class FeedLinks extends Component {
    
    state = {
        overflowVisible: false
    }

    static contextType = FeedContext;

    handleOverflowButtonClick = () => {
        if (this.state.overflowVisible) {
            this.feedsWrapper.classList.remove('divFeedsExpanded');
            this.feedsWrapper.classList.add('divFeedsHidden');
            this.setState({
                overflowVisible: false
            });
        }
        else {
            this.feedsWrapper.classList.remove('divFeedsHidden');
            this.feedsWrapper.classList.add('divFeedsExpanded');
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
        if (this.state.overflowVisible) {
            buttonIcon = <i className="fas fa-angle-up"></i>;
        }
        else {
            buttonIcon = <i className="fas fa-angle-down"></i>;
        }

        return(
            <div className="divFeedsWrapperWrapper">
                <div className="divFeedsWrapper divFeedsHidden" ref={el => this.feedsWrapper = el}>
                    <div className="divFeeds fade-in">
                        {this.renderFeedLinks()}                    
                    </div>                    
                </div>
                <button className="iconButton" onClick={this.handleOverflowButtonClick}>
                    {buttonIcon}
                </button>
            </div>
        );
    }
}