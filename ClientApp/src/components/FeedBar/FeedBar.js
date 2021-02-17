import React, { Component } from 'react';

import FeedContext from '../context/FeedContext';
import { FeedLinkAdd } from './FeedLinkAdd';
import { FeedLinkAll } from './FeedLinkAll';
import { FeedLinks } from './FeedLinks';
import styles from './FeedBar.module.css';

export class FeedBar extends Component {

    static contextType = FeedContext;

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
            <div className={styles.divFeedBar}>                
                <FeedLinkAdd />
                {this.renderFeedLinkButtons()}
            </div>
        );
    }
}

//export default FeedBar;