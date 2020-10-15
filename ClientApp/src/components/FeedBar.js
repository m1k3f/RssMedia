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

    getFeedLinksStorage = () => {
        let feedLinks = null;
        if (window.localStorage) {
            feedLinks = localStorage.getItem("rmFeeds");
            if (feedLinks === undefined || feedLinks === null || feedLinks === '') {        
                feedLinks = {
                    feedLinks: []
                };
            }
            else {
                feedLinks = JSON.parse(feedLinks);
            }
        }
        return feedLinks;
    }

    saveFeedLink = (newFeedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        savedfeedLinks.feedLinks.push(newFeedLink);

        if (window.localStorage) {
            localStorage.setItem("rmFeeds", JSON.stringify(savedfeedLinks));
        }

        this.setState({
            feedLinks: this.getFeedLinksStorage()
        });
    }

    clearActiveFeed = () => {
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    handleFeedLinkAddCallback = (feedLink) => {
        if (Object.entries(feedLink).length > 0 && feedLink != null) {
            //save new feed link to storage
            this.saveFeedLink(feedLink);
        }
    }

    render() {
        let feedLinksExist = (this.state.feedLinks.feedLinks.length > 0);

        return (
            <div className="divFeedBar">                
                <FeedLinkAdd feedBarCallback = {this.handleFeedLinkAddCallback} />
                <div hidden={!feedLinksExist}>
                    <FeedLinkAll />
                </div>
                <div hidden={!feedLinksExist}>
                    <FeedLinks links = {this.state.feedLinks} />
                </div>
            </div>
        );
    }
}

//export default FeedBar;