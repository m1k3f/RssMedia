import React, { Component } from 'react';
import { FeedLink } from './FeedLink';

export class FeedLinks extends Component {
    constructor(props) {
        super(props);        
    }

    populateFeedArticles = (feedArticles) => {
        this.props.contentCallback(feedArticles);
    }

    renderFeedLinks = () => {
        let content = '';
        if (this.props.links.feedLinks.length !== 0) {
            content = this.props.links.map((link) => {
                return (<FeedLink data = {link} contentCallBack = {this.populateFeedArticles} />);
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