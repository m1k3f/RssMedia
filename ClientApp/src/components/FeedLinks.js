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
            <div className="divFeeds">
                {this.renderFeedLinks()}                   

                {/* <a name="btnFeeds" onClick={this.handleFeedButton}>
                    Test Feed Button 1
                </a>
                <a name="btnFeeds" onClick={this.handleFeedButton}>
                    Test Feed Button 2
                </a>
                <a name="btnFeeds" onClick={this.handleFeedButton}>
                    Test Feed Button 3
                </a>
                <a name="btnFeeds" onClick={this.handleFeedButton}>
                    Test Feed Button 4
                </a> */}
            </div>
        );
    }
}