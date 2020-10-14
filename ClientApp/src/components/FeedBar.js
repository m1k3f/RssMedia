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
        //save new feed link to storage
        this.saveFeedLink(feedLink);
    }

    render() {
        let showFeedLinks = (this.state.feedLinks > 0);

        return (
            <div className="divFeedBar">                
                <FeedLinkAdd feedBarCallback = {this.handleFeedLinkAddCallback} />
                <div hidden={showFeedLinks}>
                    <FeedLinkAll />
                </div>
                <div hidden={showFeedLinks}>
                    <FeedLinks links = {this.state.feedLinks} />
                </div>
            </div>
        );
    }
}

//export default FeedBar;