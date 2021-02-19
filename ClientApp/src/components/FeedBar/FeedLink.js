import React, { Component } from 'react';

import FeedContext from '../context/FeedContext';
import styles from './FeedBar.module.css';

export class FeedLink extends Component {    

    static contextType = FeedContext;

    handleFeedButton = async (e) => {
        const eventTarget = e.target;

        //TODO: change logic to show spinner
        //document.querySelector('.divSpinner').hidden = false;

        if (eventTarget != null && eventTarget.dataset.url.length > 0) {
            const { setFeed, feedLinksSettings } = this.context;
            const feedLinkId = eventTarget.dataset.feedid;
            const feedUrl = eventTarget.dataset.url;

            setFeed(null, true);

            let feedObject = {
                feedlinkid: feedLinkId,
                feedrssurl: feedUrl,
                feedname: eventTarget.innerText,
                feedTitle: this.props.linkData.title
            }

            let maxArticles = feedLinksSettings.settings.maxArticles;
            let feed = await this.getFeed(feedObject, 0, maxArticles);

            if (feed.feedError === null) {
                //show active feed in feedbar
                this.clearActiveFeed();
                eventTarget.classList.add(styles.divFeedsActive);
                //document.querySelector('.divFeedArticles').hidden = false;               

                //TODO: change logic to hide spinner
                //document.querySelector('.divSpinner').hidden = true;                
            }
            else {
                //TODO: change logic to hide spinner
                //document.querySelector('.divSpinner').hidden = true;
            }
                       
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
            //TODO: change logic to hide spinner
            //document.querySelector('.divSpinner').hidden = true;
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
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove(styles.divFeedsActive));
    }

    render() {
        let feedLink = this.props.linkData;
        let feedUrl = (feedLink.url == null) ? '' : feedLink.url;

        return (            
            <a className={styles.feedLink} name="btnFeeds" 
                onClick={this.handleFeedButton} 
                data-feedid={feedLink.id} 
                data-url={feedUrl}
                draggable
                onDragStart={(e) => this.handleDragStart(e)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => this.handleDrop(e)}
            >
                {feedLink.name}
            </a>                
        );
    }
}