import React, { Component } from 'react';
import { FeedProvider } from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';

export class Content extends Component {
    constructor() {
        super();
        this.state = {
            feedLinks: null
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

    editFeedLink = (feedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLink.feedLinkId);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks[linkIndex].name = feedLink.name;
            this.saveAndRefreshFeedLinks(savedfeedLinks);
        }
    }

    removeFeedLink = (feedLinkId) => {
        let savedfeedLinks = this.state.feedLinks;
        
        //remove feedlink from feedlinks array
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLinkId);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks.splice(linkIndex, 1);
            this.saveAndRefreshFeedLinks(savedfeedLinks);
        }
    }

    saveAndRefreshFeedLinks = (feedLinks) => {
        if (window.localStorage) {
            localStorage.setItem("rmFeeds", JSON.stringify(feedLinks));
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

    handleFeedArticlesCallback = (option) => {
        if (option.type === 'sync') {
            
        }
        else if (option.type === 'edit') {
            this.editFeedLink(option.feedLink);
        }
        else if (option.type === 'delete') {
            this.removeFeedLink(option.selectedFeed.feedLinkId);
        }
    }

    render() {
        let storageFeedLinks = this.getFeedLinksStorage();

        return (
            <main>
                <FeedProvider>
                    <FeedBar 
                        feedLinks = {storageFeedLinks}
                        contentCallback = {this.handleFeedbarCallback} />
                    <FeedArticles contentCallback = {this.handleFeedArticlesCallback} />
                </FeedProvider>
            </main>
        );
    }
}