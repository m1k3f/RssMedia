import React, { Component } from 'react';
import { FeedLinkAdd } from './FeedLinkAdd';
import { FeedLinkAll } from './FeedLinkAll';
import { FeedLinks } from './FeedLinks';

export class FeedBar extends Component {

    constructor(props) {
        super(props); 
        this.state = {
            feedLinks: this.getFeedLinksStorage()
        }       
    }

    populateFeedArticles = (feedArticles) => {
        this.props.contentCallback(feedArticles);
    }        

    getFeedLinksStorage = () => {
        let feedLinks = null;
        if (window.localStorage) {
            feedLinks = localStorage.getItem("rmFeeds");
            if (feedLinks === undefined || feedLinks === null || feedLinks === '') {        
                feedLinks = {
                    feedLinks: []
                };
            }            
        }
        return feedLinks;
    }

    saveFeedLinkStorage = (newFeedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        
    }   

    clearActiveFeed = () => {
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    render() {
        return (
            <div className="divFeedBar">
                {/* <div className="divAdd">
                    <a onClick={this.handleAddButton}>
                        <i className="fas fa-plus fa-lg"></i>
                    </a>                    
                </div> */}
                {/* <div className="divAllFeeds">
                    <a name="btnFeeds" onClick={this.handleAllFeedsButton}>
                        All Feeds
                    </a>
                </div> */}
                <FeedLinkAdd />
                <div hidden>
                    <FeedLinkAll />
                    <FeedLinks links = {this.state.feedLinks} contentCallback = {this.populateFeedArticles} />
                </div>
            </div>
        );
    }
}

//export default FeedBar;