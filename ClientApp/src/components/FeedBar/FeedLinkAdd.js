import React, { Component } from 'react';
import { NewFeed } from './modals/NewFeed';
import { MultiFeedSelection } from './modals/MultiFeedSelection';
import { MessageDisplay } from '../modals/MessageDisplay';

export class FeedLinkAdd extends Component {
    state = {
        showNewFeedModal: false,
        showMultiFeedModal: false,
        showErrorModal: false,
        feedLinkData: []
    }

    handleAddButton = (e) => {
        this.setState({
            showNewFeedModal: true,
            showMultiFeedModal: false,
            showErrorModal: false,
            feedLinkData: [] 
        });
    }    

    handleNewFeedCallback = (feedLinkData) => {
        if (feedLinkData.length === 1) {
            //1 RSS feed found for url
            this.setState({
                showNewFeedModal: false,
                showMultiFeedModal: false,
                showErrorModal: false,
                feedLinkData: []
            });

            this.feedBarCallback(feedLinkData[0]);
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
                feedLinkData: []
            })
        }
        
    }

    handleMultiFeedCallback = (feedLink) => {
        this.setState({
            showNewFeedModal: false,
            showMultiFeedModal: false,
            showErrorModal: false,
            feedLinkData: []
        });

        this.feedBarCallback(feedLink);
    }

    feedBarCallback = (feedLink) => {
        this.props.feedBarCallback(feedLink);
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
                <MessageDisplay isError={false}>
                    No feeds could be found for the given URL.
                </MessageDisplay>
            )
        }

        return content;
    }

    render() {
        return(
            <div className="divAdd">
                <a onClick={this.handleAddButton}>
                    <i className="fas fa-plus fa-lg"></i>
                </a>
                {this.renderNewFeedModal(this.state.showNewFeedModal)}
                {this.renderMultiFeedModal(this.state)}
                {this.renderMessageModal(this.state)}
            </div>
        );
    }
}