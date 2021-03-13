import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';

import FeedContext from '../../context/FeedContext';
import styles from './FeedArticleControls.module.css';

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
        let iconStyle = {
            width: '32px',
            height: '32px'
        };

        return(
            <button className={`${styles.iconButton} ${styles.controlsButton}`} 
                    onClick={this.handleDeleteClick} title="Delete Feed">
                <FaTrash style={iconStyle} />
            </button>
        );
    }
}