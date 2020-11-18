import React, { Component } from 'react';
import { FeedProvider } from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';

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

    editFeedLink = (feedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLink.feedLinkId);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks[linkIndex].name = feedLink.name;

            if (window.localStorage) {
                localStorage.setItem("rmFeeds", JSON.stringify(savedfeedLinks));
            }

            this.setState({
                feedLinks: this.getFeedLinksStorage()
            });
        }
    }

    removeFeedLink = (feedLinkId) => {
        let savedfeedLinks = this.state.feedLinks;
        
        //remove feedlink from feedlinks array
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLinkId);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks.splice(linkIndex, 1);

            if (window.localStorage) {
                localStorage.setItem("rmFeeds", JSON.stringify(savedfeedLinks));
            }

            this.setState({
                feedLinks: this.getFeedLinksStorage()
            });
        }
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