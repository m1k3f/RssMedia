import React, { Component } from 'react';

export class FeedLinkAll extends Component {
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