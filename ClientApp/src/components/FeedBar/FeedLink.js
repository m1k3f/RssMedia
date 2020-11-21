import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';

export class FeedLink extends Component {    

    static contextType = FeedContext;

    handleFeedButton = async (e) => {
        const eventTarget = e.target;

        //TODO: change logic to show spinner
        //document.querySelector('.divSpinner').hidden = false;

        if (eventTarget != null && eventTarget.dataset.url.length > 0) {
            const feedLinkId = eventTarget.dataset.feedid;
            const feedUrl = eventTarget.dataset.url;
            let feedObject = {
                feedlinkid: feedLinkId,
                feedrssurl: feedUrl,
                feedname: eventTarget.innerText
            }
            let feed = await this.getFeed(feedObject, 0, 20);

            if (feed.feedError === null) {
                //show active feed in feedbar
                this.clearActiveFeed();
                eventTarget.classList.add('divFeedsActive');
                //document.querySelector('.divFeedArticles').hidden = false;               

                //TODO: change logic to hide spinner
                //document.querySelector('.divSpinner').hidden = true;                
            }
            else {
                //TODO: change logic to hide spinner
                //document.querySelector('.divSpinner').hidden = true;
            }

            //add feed to context
            const {setFeed} = this.context;
            setFeed(feed); 
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

        let feedLink = this.props.linkData;

        //get feedlink
        let data = e.dataTransfer.getData("text");
        let droppedFeedLink = JSON.parse(data);
        
        // pass feedLink and draggedFeedLink to Content
        this.props.feedLinksCallback(feedLink, droppedFeedLink);        
    }

    getFeed = async (feedObject, articleOffset, articleCount) => {

        let feeds = {
            feedlist: [feedObject],
            feedarticleoffset: articleOffset,
            feedarticlecount: articleCount
        };      

        let request = new Request('api/rssmedia/feed', {
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
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    render() {
        let feedLink = this.props.linkData;
        let feedUrl = (feedLink.url == null) ? '' : feedLink.url;

        return (            
            <a name="btnFeeds" onClick={this.handleFeedButton} 
                data-feedid={feedLink.id} 
                data-url={feedUrl}
                draggable
                onDragStart={(e) => this.handleDragStart(e, this.props.linkOrder)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => this.handleDrop(e)}
            >
                {feedLink.name}
            </a>                
        );
    }
}