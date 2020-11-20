import React, { Component } from 'react';

export class FeedLinkAll extends Component {
    
    handleAllFeedsButton = (e) => {
        //get all feed articles from service

        this.clearActiveFeed();        
        e.target.classList.add('divFeedsActive');
    }

    render() {
        return (
            <div className="divAllFeeds">
                <a name="btnFeeds" onClick={this.handleAllFeedsButton}>
                    All Feeds
                </a>
            </div>
        );
    }
}