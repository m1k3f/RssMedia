import React, { Component } from 'react';
import { FeedLink } from './FeedLink';

export class FeedLinks extends Component {
    
    handleFeedLinkCallback = (existingFeedLink, droppedFeedLink) => {
        this.props.feedBarCallback(existingFeedLink, droppedFeedLink);
    }

    renderFeedLinks = () => {
        let feedLinks = this.props.links.feedLinks;
        let content = '';        
        if (feedLinks.length > 0) {
            let order = 0;
            content = feedLinks.map((link) => {
                order++;
                return (
                    <FeedLink 
                        key = {link.id} 
                        linkOrder = {order} 
                        linkData = {link} 
                        feedLinksCallback = {this.handleFeedLinkCallback}
                    />
                );
            });
        }

        return (content);
    }

    render() {
        return(
            <div className="divFeeds fade-in">
                {this.renderFeedLinks()}
            </div>
        );
    }
}