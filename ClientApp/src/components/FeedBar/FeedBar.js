import React, { Component } from 'react';
import { FeedLinkAdd } from './FeedLinkAdd';
import { FeedLinkAll } from './FeedLinkAll';
import { FeedLinks } from './FeedLinks';

export class FeedBar extends Component {

    saveFeedLink = (newFeedLink) => {
        let savedfeedLinks = this.props.feedLinks;
        savedfeedLinks.feedLinks.push(newFeedLink);

        if (window.localStorage) {
            localStorage.setItem("rmFeeds", JSON.stringify(savedfeedLinks));
        }

        // this.setState({
        //     feedLinks: this.getFeedLinksStorage()
        // });

        this.props.contentCallback();
    }

    handleFeedLinkAddCallback = (feedLink) => {
        if (Object.entries(feedLink).length > 0 && feedLink != null) {
            //save new feed link to storage
            this.saveFeedLink(feedLink);
        }
    }

    render() {
        let feedLinksExist = (this.props.feedLinks.feedLinks.length > 0);

        return (
            <div className="divFeedBar">                
                <FeedLinkAdd feedBarCallback = {this.handleFeedLinkAddCallback} />
                <div hidden={!feedLinksExist}>
                    <FeedLinkAll />
                </div>
                <div hidden={!feedLinksExist}>
                    <FeedLinks links = {this.props.feedLinks} />
                </div>
            </div>
        );
    }
}

//export default FeedBar;