import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';
import { FeedLink } from './FeedLink';

export class FeedLinks extends Component {
    
    static contextType = FeedContext;

    handleFeedLinkCallback = (existingFeedLink, droppedFeedLink) => {
        //this.props.feedBarCallback(existingFeedLink, droppedFeedLink);
        if (droppedFeedLink !== null) {
            this.reorderFeedLinks(existingFeedLink, droppedFeedLink);
        }
        else {
            this.editFeedLink(existingFeedLink);
        }
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
        
        this.saveRefreshFeedLinks(savedfeedLinks);
    }

    editFeedLink = (feedLink) => {
        let savedfeedLinks = this.state.feedLinks;
        let linkIndex = savedfeedLinks.feedLinks.findIndex((link) => 
                            link.id === feedLink.feedLinkId || link.id === feedLink.id);
        if (linkIndex > -1) {
            savedfeedLinks.feedLinks[linkIndex] = feedLink;
            this.saveRefreshFeedLinks(savedfeedLinks);            
        }
    }

    saveRefreshFeedLinks = (feedLinks) => {
        const { setFeedLinks, saveAndRefreshFeedLinks } = this.context;
        setFeedLinks(feedLinks);
        saveAndRefreshFeedLinks(feedLinks);
    }

    renderFeedLinks = () => {
        let feedLinks = this.props.links.feedLinks;
        let content = '';        
        if (feedLinks.length > 0) {
            let order = 0;
            content = feedLinks.map((link) => {
                order++;
                return (
                    <FeedLink 
                        key = {link.id} 
                        linkOrder = {order} 
                        linkData = {link} 
                        feedLinksCallback = {this.handleFeedLinkCallback}
                    />
                );
            });
        }

        return (content);
    }

    render() {
        return(
            <div className="divFeeds fade-in">
                {this.renderFeedLinks()}
            </div>
        );
    }
}