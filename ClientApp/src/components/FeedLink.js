import React, { Component } from 'react';

export class Feed extends Component {
    constructor(props) {
        super(props);
    }

    handleFeedButton = (e) => {
        //show spinner
        document.querySelector('.divSpinner').hidden = false;

        //TODO: get list of feeds and determine which one was clicked
        let feedUrl = e.target.dataset.url;

        //TODO: get feed articles from service
        let feedArticles = this.getFeedArticles(feedUrl);

        //show active feed in feedbar
        this.clearActiveFeed();
        e.target.classList.add('divFeedsActive');
        //document.querySelector('.divFeedArticles').hidden = false;

        //set state with articles array
        // this.setState({
        //     articles: feedArticles
        // })

        //hide spinner
        document.querySelector('.divSpinner').hidden = true;

        //show articles
        this.populateFeedArticles(feedArticles);        
    }

    getFeedArticles = (feedUrl) => {
        //get FeedUrlList from service
        //const response = await fetch('rssmedia/feedlinks');
        
        //if more than 1 URL, allow user to select feed. use popup modal

        //build feed object and get feed data from service

        //return articles array
        return [];
    }

    clearActiveFeed = () => {
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"]');
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    populateFeedArticles = (feedArticles) => {
        this.props.contentCallback(feedArticles);
    }

    render() {
        let feedLink = this.props.data;

        return (
            <a name="btnFeeds" onClick={this.handleFeedButton} 
                data-feedid={feedLink.Id} 
                data-url={encodeURIComponent(feedLink.url)}>
                {feedLink.feedname}
            </a>
        );
    }
}