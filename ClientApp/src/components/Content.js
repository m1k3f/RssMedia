import React, { Component } from 'react';
import { FeedProvider } from './context/FeedContext';
import { FeedBar } from './FeedBar';
import { FeedArticles } from './FeedArticles';

export class Content extends Component {
    constructor() {
        super();
        this.state = {
            feedLinks: this.getFeedLinksStorage()
        }
    }
    
    getFeedLinksStorage = () => {
        let feedLinks = null;
        if (window.localStorage) {
            feedLinks = localStorage.getItem("rmFeeds");
            if (feedLinks === undefined || feedLinks === null || feedLinks === '') {        
                feedLinks = {
                    feedLinks: []
                };
            }
            else {
                feedLinks = JSON.parse(feedLinks);
            }
        }
        return feedLinks;
    }    

    removeFeedLink = (feedLinkId) => {
        let savedfeedLinks = this.state.feedLinks;
        
        //remove feedlink from feedlinks array
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLinkId);
        savedfeedLinks.splice(linkIndex, 1);

        if (window.localStorage) {
            localStorage.setItem("rmFeeds", JSON.stringify(savedfeedLinks));
        }

        this.setState({
            feedLinks: this.getFeedLinksStorage()
        });
    }

    handleFeedbarCallback = () => {
        this.setState({
            feedLinks: this.getFeedLinksStorage()
        });
    }

    handleFeedArticlesCallback = (feedLink, option) => {
        if (option === 'edit') {

        }
        else if (option === 'delete') {
            this.removeFeedLink(feedLink.id);
        }
    }

    render() {
        return (
            <main>
                <FeedProvider>
                    <FeedBar 
                        feedLinks = {this.state.feedLinks}
                        contentCallback = {this.handleFeedbarCallback} />
                    <FeedArticles contentCallback = {this.handleFeedArticlesCallback} />
                </FeedProvider>
            </main>
        );
    }
}