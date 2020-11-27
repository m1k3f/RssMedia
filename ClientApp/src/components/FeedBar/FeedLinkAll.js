import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';

export class FeedLinkAll extends Component {
    
    static contextType = FeedContext;

    handleAllFeedsButton = async (e) => {
        const eventTarget = e.target;
        
        let feedLinkObjectArray = this.props.feedLinks.feedLinks.map((link) => {
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

        let responseFeed = await this.getAllFeeds(feeds);

        if (responseFeed.feedError === null) {
            this.clearActiveFeed();        
            eventTarget.classList.add('divFeedsActive');
        }
        else {

        }

        //add feed to context
        const {setFeed} = this.context;
        setFeed(responseFeed);
    }

    getAllFeeds = async (feeds) => {
        let request = new Request('api/rssmedia/allfeeds', {
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
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    render() {
        return (
            <div className="divAllFeeds">
                <a name="btnFeeds" onClick={this.handleAllFeedsButton}>
                    All Feeds
                </a>
            </div>
        );
    }
}