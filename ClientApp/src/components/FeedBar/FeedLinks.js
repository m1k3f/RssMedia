import React, { Component } from 'react';
import { FeedLink } from './FeedLink';

export class FeedLinks extends Component {
    
    renderFeedLinks = () => {
        let feedLinks = this.props.links.feedLinks;
        let content = '';
        if (feedLinks.length > 0) {
            content = feedLinks.map((link) => {
                return (<FeedLink key = {link.id} linkData = {link} />);
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