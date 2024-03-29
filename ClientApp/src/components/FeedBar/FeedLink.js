import React, { Component } from 'react';

import FeedContext from '../context/FeedContext';
import styles from './FeedBar.module.css';

export class FeedLink extends Component {    

    static contextType = FeedContext;

    handleFeedButton = async (e) => {
        const eventTarget = e.target;
        let feedLink = this.props.linkData;        

        if (eventTarget != null && feedLink.url.length > 0) {
            const { setFeed, feedLinksSettings } = this.context;            

            setFeed(null, true);

            let feedObject = {
                feedlinkid: feedLink.id,
                feedrssurl: feedLink.url,
                feedname: feedLink.name,
                feedTitle: feedLink.title
            }

            let maxArticles = feedLinksSettings.settings.maxArticles;
            let feed = await this.getFeed(feedObject, 0, maxArticles);

            this.clearActiveFeed();
            eventTarget.classList.add(styles.divFeedsActive);

            if (feed.feedError === null) {
                let nowDateTime = new Date();
                feed.lastAccessed = this.props.linkData.lastAccessed !== undefined ? 
                                    this.props.linkData.lastAccessed : 
                                    nowDateTime;
                feed.firstAccess = this.props.linkData.lastAccessed !== undefined ? false : true;            
                setFeed(feed, false);
                
                this.props.linkData.lastAccessed = nowDateTime;
                this.props.feedLinksCallback(this.props.linkData, null);
            }
            else {
                setFeed(feed, false);
            }
        }     
    }

    handleDragStart = (e) =>  {
        let feedLink = this.props.linkData;
        e.dataTransfer.setData('text/plain', JSON.stringify(feedLink));
    }

    handleDrop = (e) => {
        e.preventDefault();

        const feedLink = this.props.linkData;

        let data = e.dataTransfer.getData("text");
        const droppedFeedLink = JSON.parse(data);
        
        this.props.feedLinksCallback(feedLink, droppedFeedLink);        
    }

    getFeed = async (feedObject, articleOffset, articleCount) => {

        let feeds = {
            feedlist: [feedObject],
            feedarticleoffset: articleOffset,
            feedarticlecount: articleCount
        };      

        let request = new Request(process.env.REACT_APP_APIFEED, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feeds)
        });

        //send request to service
        let serviceFeedObject = await fetch(request).then((response) => response.json());        
        
        return serviceFeedObject;
    }

    clearActiveFeed = () => {
        //TODO: rewrite this to not use querySelectorAll
        let feedButtons = document.querySelectorAll('button[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove(styles.divFeedsActive));
    }

    render() {
        let feedLink = this.props.linkData;

        return (
            <button className={styles.feedLink} name="btnFeeds"
                    onClick={this.handleFeedButton} 
                    draggable
                    onDragStart={(e) => this.handleDragStart(e)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => this.handleDrop(e)}>
                {feedLink.name}
            </button>
        );
    }
}