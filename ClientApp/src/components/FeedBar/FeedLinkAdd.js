import React, { Component } from 'react';

import FeedContext from '../context/FeedContext';
import { NewFeed } from './modals/NewFeed';
import { MultiFeedSelection } from './modals/MultiFeedSelection';
import { MessageDisplay } from '../modals/MessageDisplay';
import styles from './FeedBar.module.css';

export class FeedLinkAdd extends Component {
    state = {
        showNewFeedModal: false,
        showMultiFeedModal: false,
        showErrorModal: false,
        feedLinkData: [],
        isLoading: false
    }

    static contextType = FeedContext;

    handleAddButton = (e) => {
        this.setState({
            showNewFeedModal: true,
            showMultiFeedModal: false,
            showErrorModal: false,
            feedLinkData: [],
            isLoading: true
        });
    }    

    handleNewFeedCallback = (feedLinkData) => {
        if (feedLinkData !== null) {
            if (feedLinkData.length === 1) {
                //1 RSS feed found for url
                this.setState({
                    showNewFeedModal: false,
                    showMultiFeedModal: false,
                    showErrorModal: false,
                    feedLinkData: [],
                    isLoading: false
                });

                this.saveNewFeedLink(feedLinkData[0]);
            }
            else if (feedLinkData.length > 1) {
                //Multiple RSS feeds found for url
                this.setState({
                    showNewFeedModal: false,
                    showMultiFeedModal: true,
                    showErrorModal: false,
                    feedLinkData: feedLinkData
                });
            }
            else {
                this.setState({
                    showNewFeedModal: false,
                    showMultiFeedModal: false,
                    showErrorModal: true,
                    feedLinkData: [],
                    isLoading: false
                })
            }
        }
        else {
            this.setState({
                showNewFeedModal: false,
                showMultiFeedModal: false,
                showErrorModal: false,
                feedLinkData: [],
                isLoading: false
            });
        }
        
    }

    handleMultiFeedCallback = (feedLink) => {        
        this.setState({
            showNewFeedModal: false,
            showMultiFeedModal: false,
            showErrorModal: false,
            feedLinkData: [],
            isLoading: false
        });

        if (feedLink !== null) {
            this.saveNewFeedLink(feedLink);
        }        
    }

    handleMessageDisplayCallback = () => {
        this.setState({
            showNewFeedModal: false,
            showMultiFeedModal: false,
            showErrorModal: false,
            feedLinkData: []
        });
    }

    saveNewFeedLink = (newFeedLink) => {
        const { feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
        let feedLinkSettingsCopy = {...feedLinksSettings};
        
        newFeedLink.position = (feedLinkSettingsCopy.feedLinks.length > 0) ? feedLinkSettingsCopy.feedLinks.length : 0;        
        feedLinkSettingsCopy.feedLinks.push({
            id: newFeedLink.id,
            title: newFeedLink.title,
            url: newFeedLink.url,
            name: newFeedLink.name,
            addUrl: newFeedLink.addUrl,
            position: newFeedLink.position
        });
        
        saveAndRefreshFeedLinks(feedLinkSettingsCopy);
    }

    renderNewFeedModal = (show) => {
        let content = '';
        if (show) {
            content = <NewFeed feedLinkAddCallback = {this.handleNewFeedCallback} />
        }

        return (content);
    }

    renderMultiFeedModal = ({showMultiFeedModal, feedLinkData}) => {
        let content = '';
        if (showMultiFeedModal) {
            content = <MultiFeedSelection linkData = {feedLinkData} feedLinkAddCallback = {this.handleMultiFeedCallback} />
        }

        return (content);
    }

    renderMessageModal = ({showErrorModal}) => {
        let content = '';
        if (showErrorModal) {
            content = (
                <MessageDisplay isError={false} messageDisplayCallback={this.handleMessageDisplayCallback}>
                    No feeds could be found for the given URL.
                </MessageDisplay>
            )
        }

        return content;
    }

    renderAddItem = () => {
        let content = null;
        let iconStyle = {
            padding: '10px',
            // marginTop: '6px',
            fontSize: '18px'
        };

        if (this.state.isLoading) {            
            content = (
                <i className="fas fa-spinner fa-spin" style={iconStyle}></i>
            );
        }
        else {
            content = (
                <button className={`${styles.divAddLink} ${styles.iconButton}`} 
                        onClick={this.handleAddButton}>
                    <i className="fas fa-plus fa-lg" style={iconStyle}></i>
                </button>
            );
        }

        return (content);
    }

    render() {
        return(
            <div className={styles.divAdd}>
                {this.renderAddItem()}
                {this.renderNewFeedModal(this.state.showNewFeedModal)}
                {this.renderMultiFeedModal(this.state)}
                {this.renderMessageModal(this.state)}
            </div>
        );
    }
}