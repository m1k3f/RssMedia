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

    renderFeedLinkButtons = () => {
        let content = '';
        let feedLinksExist = (this.props.feedLinks.feedLinks.length > 0);
        if (feedLinksExist) {
            content = (
                <React.Fragment>
                    <FeedLinkAll />
                    <FeedLinks links = {this.props.feedLinks} />
                </React.Fragment>
            );
        }

        return (content);
    }

    render() {
        return (
            <div className="divFeedBar">                
                <FeedLinkAdd feedBarCallback = {this.handleFeedLinkAddCallback} />
                {this.renderFeedLinkButtons()}
            </div>
        );
    }
}

//export default FeedBar;