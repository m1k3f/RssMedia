import React, { Component } from 'react';

const FeedContext = React.createContext();

//export const FeedConsumer = FeedContext.Consumer;

class FeedProvider extends Component {
    constructor() {
        super();
        this.state = {
            selectedFeed: null,
            selectedFeedLoading: false,
            feedLinksSettings: this.getFeedLinksStorage(),
            selectedEnclosureArticle: null
        }
    }    

    setFeed = (feed) => {
        this.setState({
            selectedFeed: feed
        });
    }

    setFeed = (feed, isLoading) => {
        this.setState({
            selectedFeed: feed,
            selectedFeedLoading: isLoading
        });
    }

    setFeedLinks = (feedLinks) => {
        let feedLinksSettings = this.state.feedLinksSettings;
        feedLinksSettings.feedLinks = feedLinks;

        this.setState({
            feedLinksSettings: feedLinksSettings
        });
    }

    setSettings = (settings) => {
        let feedLinksSettings = this.state.feedLinksSettings;
        feedLinksSettings.settings = settings;

        this.setState({
            feedLinksSettings: feedLinksSettings
        });
    }

    setSelectedEnclosureArticle = (article) => {
        this.setState({
            selectedEnclosureArticle: article
        });
    }

    getFeedLinksStorage = () => {
        let feedLinks = null;
        if (window.localStorage) {
            feedLinks = localStorage.getItem("rmFeeds");
            if (feedLinks === undefined || feedLinks === null || feedLinks === '') {        
                feedLinks = {
                    version: 1,
                    settings: {
                        maxArticles: 20
                    },
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

    feedLinksSort = (a, b) => {
        if (a.position < b.position) {
            return -1;
        }
        if (a.position > b.position) {
            return 1;
        }
        return 0;
    }

    saveAndRefreshFeedLinks = (feedLinks) => {
        if (window.localStorage) {
            localStorage.setItem("rmFeeds", JSON.stringify(feedLinks));
        }

        this.setState({
            feedLinksSettings: this.getFeedLinksStorage()
        });
    }

    render() {
        const { children } = this.props
        const { selectedFeed, selectedFeedLoading, feedLinksSettings, selectedEnclosureArticle } = this.state
        const { setFeed, setFeedLinks, setSettings, setSelectedEnclosureArticle, getFeedLinksStorage, saveAndRefreshFeedLinks } = this

        return (
            <FeedContext.Provider 
                value={
                    {
                        selectedFeed,
                        selectedFeedLoading,
                        setFeed,
                        feedLinksSettings,
                        setFeedLinks,
                        setSettings,
                        selectedEnclosureArticle,
                        setSelectedEnclosureArticle,
                        getFeedLinksStorage,
                        saveAndRefreshFeedLinks
                    }
                }
                >
                {children}
            </FeedContext.Provider>
        );
    }
}

export default FeedContext;
export { FeedProvider };