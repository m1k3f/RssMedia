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
                feedLinks.feedLinks.sort((a, b) => this.feedLinksSort(a, b));
            }
        }
        return feedLinks;
    }

    editFeedLink = (feedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLink.feedLinkId);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks[linkIndex].name = feedLink.name;
            savedfeedLinks.feedLinks[linkIndex].title = feedLink.title;
            this.saveAndRefreshFeedLinks(savedfeedLinks);            
        }
    }

    removeFeedLink = (feedLinkId) => {
        let savedfeedLinks = this.state.feedLinks;
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === feedLinkId);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks.splice(linkIndex, 1);
            this.saveAndRefreshFeedLinks(savedfeedLinks);
        }
    }

    saveNewFeedLink = (newFeedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        
        newFeedLink.position = (savedfeedLinks.feedLinks.length > 0) ? savedfeedLinks.feedLinks.length : 0;        
        savedfeedLinks.feedLinks.push(newFeedLink);

        this.saveAndRefreshFeedLinks(savedfeedLinks);
    }

    reorderFeedLinks = (existingFeedLink, droppedFeedLink) => {
        const originalFeedLink = {...existingFeedLink};
        let savedfeedLinks = this.state.feedLinks;  

        let existingFeedLinkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === originalFeedLink.id);
        let droppedFeedLinkIndex = savedfeedLinks.feedLinks.findIndex((link) => link.id === droppedFeedLink.id);
        
        let dropLeft = (droppedFeedLinkIndex > existingFeedLinkIndex) ? true : false;
        let newArray = savedfeedLinks.feedLinks.map((savedLink, index) =>  {
            if (index === droppedFeedLinkIndex) {
                savedLink.position = originalFeedLink.position;
            }
            else if (index === existingFeedLinkIndex) {
                savedLink.position = (dropLeft) ? originalFeedLink.position + 1 : originalFeedLink.position - 1;                
            }            
            else if (dropLeft && (index > existingFeedLinkIndex && index < droppedFeedLinkIndex)) {
                savedLink.position = savedLink.position + 1;
            }
            else if (!dropLeft && (index < existingFeedLinkIndex && index > droppedFeedLinkIndex)) {
                savedLink.position = savedLink.position - 1;
            }

            return savedLink;
        });

        savedfeedLinks.feedLinks = newArray;

        this.saveAndRefreshFeedLinks(savedfeedLinks);
    }

    saveAndRefreshFeedLinks = (feedLinks) => {
        if (window.localStorage) {
            localStorage.setItem("rmFeeds", JSON.stringify(feedLinks));
        }

        this.setState({
            feedLinks: this.getFeedLinksStorage()
        });
    }

    handleFeedbarCallback = (option) => {
        if (option.type === 'saveFeedLink') {
            this.saveNewFeedLink(option.newFeedLink);
        }
        else if (option.type === 'reorderFeedLink') {
            this.reorderFeedLinks(option.existingFeedLink, option.droppedFeedLink);
        }        
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

    // feedLinksSort = (a, b) => {
    //     let aName = a.name.toLowerCase();
    //     let bName = b.name.toLowerCase();
    //     if (aName < bName) {
    //         return -1;
    //     }
    //     if (aName > bName) {
    //         return 1;
    //     }
    //     return 0;
    // }

    feedLinksSort = (a, b) => {
        if (a.position < b.position) {
            return -1;
        }
        if (a.position > b.position) {
            return 1;
        }
        return 0;
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