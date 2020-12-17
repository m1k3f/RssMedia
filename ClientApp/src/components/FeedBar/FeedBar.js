import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';
import { FeedLinkAdd } from './FeedLinkAdd';
import { FeedLinkAll } from './FeedLinkAll';
import { FeedLinks } from './FeedLinks';

export class FeedBar extends Component {

    static contextType = FeedContext;

    handleFeedLinkAddCallback = (newFeedLink) => {
        // if (Object.entries(newFeedLink).length > 0 && newFeedLink != null) {
        //     //save new feed link to storage
        //     let option = {
        //         type: 'saveFeedLink',
        //         newFeedLink: newFeedLink
        //     }
    
        //     this.props.contentCallback(option);
        // }
    }

    renderFeedLinkButtons = () => {
        let content = '';
        const feedContext = this.context;
        let feedLinks = [...feedContext.feedLinksSettings.feedLinks];

        if (feedLinks.length > 0) {
            content = (
                <React.Fragment>
                    <FeedLinkAll links = {feedLinks} />
                    <FeedLinks 
                        links = {feedLinks} 
                    />
                </React.Fragment>
            );
        }

        return (content);
    }

    render() {
        return (
            <div className="divFeedBar">                
                <FeedLinkAdd />
                {this.renderFeedLinkButtons()}
            </div>
        );
    }
}

//export default FeedBar;