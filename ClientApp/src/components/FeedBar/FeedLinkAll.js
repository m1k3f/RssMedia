import React, { Component } from 'react';

import FeedContext from '../context/FeedContext';
import styles from './FeedBar.module.css';

export class FeedLinkAll extends Component {
    
    static contextType = FeedContext;

    handleAllFeedsButton = async (e) => {
        const {setFeed} = this.context;
        setFeed(null, true);
        
        let responseFeed = await this.getAllFeeds();

        if (responseFeed.feedError === null) {
            this.clearActiveFeed();        
            this.allFeedsButton.classList.add(styles.divFeedsActive);
        }

        //add feed to context
        
        setFeed(responseFeed, false);
    }

    getAllFeeds = async () => {
        let feedLinkObjectArray = this.props.links.map((link) => {
            let feedObject = {
                feedlinkid: link.id,
                feedrssurl: link.url,
                feedname: link.name
            }
            return feedObject;
        });

        let feeds = {
            feedlist: feedLinkObjectArray,
            feedarticleoffset: 0,
            feedarticlecount: 50
        };

        let request = new Request(process.env.REACT_APP_APIALLFEEDS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feeds)
        });

        let serviceFeedObject = await fetch(request).then((response) => response.json());

        return serviceFeedObject;
    }

    clearActiveFeed = () => {
        //TODO: rewrite this to not use querySelectorAll
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove(styles.divFeedsActive));
    }

    render() {
        return (
            <div className={styles.divAllFeeds}>
                <a className={styles.divAllFeedsButton} 
                    name="btnFeeds" 
                    onClick={this.handleAllFeedsButton}
                    ref={el => this.allFeedsButton = el}>
                    All Feeds
                </a>
            </div>
        );
    }
}