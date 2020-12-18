import React, { Component} from 'react';
import FeedContext from '../context/FeedContext';
import { SyncButton } from './Controls/SyncButton';
import { EditButton } from './Controls/EditButton';
import { DeleteButton } from './Controls/DeleteButton';
import { FeedImageLink } from './Controls/FeedImageLink';

export class FeedArticlesControls extends Component {
    
    static contextType = FeedContext;

    handleButtonClick = (buttonObject) => {
        // option.selectedFeed = this.props.feed;
        // this.props.feedArticlesCallback(option);

        const {feedLinksSettings} = this.context;
        if (buttonObject.action === 'sync') {
            
            
        }
        else if (buttonObject.action === 'edit') {
            let nowDateTime = new Date();
            buttonObject.feedLink.lastAccessed = nowDateTime;

            this.editFeedLink(buttonObject.feedLink);
            this.setSelectedFeed(buttonObject.feedLink, feedLinksSettings.settings);
        }
        else if (buttonObject.action === 'delete') {

        }
    }

    editFeedLink = (feedLink) => {
        const {feedLinksSettings, saveAndRefreshFeedLinks} = this.context;

        let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => 
                            link.id === feedLink.id);
        if (linkIndex > -1) {
            feedLinksSettings.feedLinks[linkIndex].lastAccessed = feedLink.lastAccessed;
        }

        saveAndRefreshFeedLinks(feedLinksSettings);
    }

    setSelectedFeed = async (feedLink, settings) => {
        const {setFeed} = this.context;
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

        serviceFeedObject.lastAccessed = feedLink.lastAccessed;
        serviceFeedObject.firstAccess = false;
        setFeed(serviceFeedObject);
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
                        <SyncButton controlsCallback = {this.handleButtonClick} />
                    </div>
                );
            }
            else {
                content = (
                    <div className="divFeedArticlesControls">
                        <FeedImageLink selectedFeed = {this.props.feed} />
                        <SyncButton controlsCallback = {this.handleButtonClick} />
                        <EditButton controlsCallback = {this.handleButtonClick} 
                                    selectedFeed = {this.props.feed} />
                        <DeleteButton controlsCallback = {this.handleButtonClick} />
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