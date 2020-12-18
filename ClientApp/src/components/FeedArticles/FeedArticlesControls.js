import React, { Component} from 'react';
import FeedContext from '../context/FeedContext';
import { SyncButton } from './Controls/SyncButton';
import { EditButton } from './Controls/EditButton';
import { DeleteButton } from './Controls/DeleteButton';
import { FeedImageLink } from './Controls/FeedImageLink';

export class FeedArticlesControls extends Component {
    
    static contextType = FeedContext;

    handleButtonClick = (buttonObject) => {
        const {feedLinksSettings} = this.context;
        if (buttonObject.action === 'sync') {            
            this.setSelectedFeed(buttonObject.feedLink, feedLinksSettings.settings);
        }
        else if (buttonObject.action === 'edit') {
            let nowDateTime = new Date();
            buttonObject.feedLink.lastAccessed = nowDateTime;

            this.updateFeedLink(feedLinksSettings, buttonObject.feedLink);
            this.setSelectedFeed(buttonObject.feedLink, feedLinksSettings.settings);
        }
        else if (buttonObject.action === 'delete') {            
            this.setSelectedFeed(null, null);
            this.saveFeedLinkUpdates(feedLinksSettings);            
        }
    }

    updateFeedLink = (feedLinksSettings, feedLink) => {
        let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => 
                            link.id === feedLink.id);
        if (linkIndex > -1) {
            feedLinksSettings.feedLinks[linkIndex].lastAccessed = feedLink.lastAccessed;
        }

        this.saveFeedLinkUpdates(feedLinksSettings);
    }

    saveFeedLinkUpdates = (feedLinksSettings) => {
        const {saveAndRefreshFeedLinks} = this.context;
        saveAndRefreshFeedLinks(feedLinksSettings);        
    }

    setSelectedFeed = async (feedLink, settings) => {
        const {setFeed} = this.context;

        let selectedFeed = null;
        if (feedLink !== null) {
            let maxArticles = settings.maxArticles;

            let feedObject = {
                feedlinkid: feedLink.id,
                feedrssurl: feedLink.url,
                feedname: feedLink.name,
                feedTitle: feedLink.title
            }

            let feeds = {
                feedlist: [feedObject],
                feedarticleoffset: 0,
                feedarticlecount: maxArticles
            };

            let request = new Request('api/rssmedia/feed', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },                    
                body: JSON.stringify(feeds)
            });

            let serviceFeedObject = await fetch(request).then((response) => response.json());
            if (serviceFeedObject !== null && Object.entries(serviceFeedObject).length > 0) {
                serviceFeedObject.lastAccessed = feedLink.lastAccessed;
                serviceFeedObject.firstAccess = false;

                selectedFeed = serviceFeedObject;
            }
        }

        setFeed(selectedFeed);
    }

    renderControls = () => {
        let hideDiv = (this.props.feed == null);
        let isAllFeeds = (this.props.feed != null && this.props.feed.feedName === 'All Feeds');
        let content = null;
        if (!hideDiv) {
            if (isAllFeeds) {
                content = (
                    <div className="divFeedArticlesControls">
                        <FeedImageLink selectedFeed = {this.props.feed} />
                        <SyncButton controlsCallback = {this.handleButtonClick}
                                    selectedFeed = {this.props.feed} />
                    </div>
                );
            }
            else {
                content = (
                    <div className="divFeedArticlesControls">
                        <FeedImageLink selectedFeed = {this.props.feed} />
                        <SyncButton controlsCallback = {this.handleButtonClick}
                                    selectedFeed = {this.props.feed} />
                        <EditButton controlsCallback = {this.handleButtonClick} 
                                    selectedFeed = {this.props.feed} />
                        <DeleteButton controlsCallback = {this.handleButtonClick}
                                    selectedFeed = {this.props.feed} />
                    </div>
                );
            }
        }

        return(content);
    }

    render() {
        return(
            <React.Fragment>
                {this.renderControls()}
            </React.Fragment>
        );
    }
}