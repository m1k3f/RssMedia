import React, { Component } from 'react';
import FeedContext from '../../context/FeedContext';

export class DeleteButton extends Component {

    static contextType = FeedContext;

    handleDeleteClick = (e) => {
        //TODO: modal popup: Are you sure you want to to delete?
        // if true, then delete.

        const {feedLinksSettings} = this.context;
        
        let feedLinkId = this.props.selectedFeed.feedLinkId;
        let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => link.id === feedLinkId);
        if (linkIndex > -1) {
            feedLinksSettings.feedLinks.splice(linkIndex, 1);
        }

        let option = {
            action: 'delete'
        };

        this.props.controlsCallback(option);
    }

    render() {
        return(
            <a className="clickable" onClick={this.handleDeleteClick}>
                <i className="fas fa-trash fa-lg"></i>
            </a>
        );
    }
}