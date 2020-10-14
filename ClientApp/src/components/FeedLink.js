import React, { Component } from 'react';
import FeedContext from './context/FeedContext';

export class FeedLink extends Component {
    constructor(props) {
        super(props);

        this.state = {
            feedObject: {}
        }
    }

    static contextType = FeedContext;

    handleFeedButton = async (e) => {
        //show spinner
        document.querySelector('.divSpinner').hidden = false;

        if (e.target != null && e.target.dataset.url.length > 0) {
            const feedUrl = e.target.dataset.url;
            let feed = await this.getFeed(feedUrl, 0, 20);

            //show active feed in feedbar
            this.clearActiveFeed();
            e.target.classList.add('divFeedsActive');
            //document.querySelector('.divFeedArticles').hidden = false;

            //set state with articles array
            this.setState({
                feedObject: feed
            })

            //hide spinner
            document.querySelector('.divSpinner').hidden = true;

            //add feed to context
            const {setFeed} = this.context;
            setFeed(feed);        
        }
        else {
            //hide spinner
            document.querySelector('.divSpinner').hidden = true;
        }

        
    }

    getFeed = async (feedUrl, articleOffset, articleCount) => {

        let feed = {
            // feedname: feedLink.name,
            feedrssurl: feedUrl
        };

        let feeds = {
            feedlist: [feed],
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
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    render() {
        let feedLink = this.props.linkData;
        let feedUrl = (feedLink.url == null) ? '' : feedLink.url;

        return (            
            <a name="btnFeeds" onClick={this.handleFeedButton} 
                data-feedid={feedLink.id} 
                data-url={encodeURIComponent(feedUrl)}>
                {feedLink.name}
            </a>                
        );
    }
}