import React, { Component } from 'react';
import { FeedLinkAdd } from './FeedLinkAdd';
import { FeedLinkAll } from './FeedLinkAll';
import { FeedLinks } from './FeedLinks';

export class FeedBar extends Component {

    handleFeedLinkAddCallback = (newFeedLink) => {
        if (Object.entries(newFeedLink).length > 0 && newFeedLink != null) {
            //save new feed link to storage
            let option = {
                type: 'saveFeedLink',
                newFeedLink: newFeedLink
            }
    
            this.props.contentCallback(option);
        }
    }

    handleFeedLinksCallback = (existingFeedLink, droppedFeedLink) => {
        let option = {
            type: 'reorderFeedLink',
            existingFeedLink: existingFeedLink,
            droppedFeedLink: droppedFeedLink
        }

        this.props.contentCallback(option);
    }

    renderFeedLinkButtons = () => {
        let content = '';
        let feedLinksExist = (this.props.feedLinks.feedLinks.length > 0);
        if (feedLinksExist) {
            content = (
                <React.Fragment>
                    <FeedLinkAll links = {this.props.feedLinks} />
                    <FeedLinks 
                        links = {this.props.feedLinks} 
                        feedBarCallback = {this.handleFeedLinksCallback}
                    />
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