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
        let articlesExist = (this.props.selectedFeed != null && this.props.selectedFeed.feedArticles != null);
        let buttonClass = articlesExist ? styles.controlsButton : styles.controlsButtonRight;
        let iconClass = articlesExist ? styles.controlsButtonIcon : styles.controlsButtonIconRight;

        return(
            <button className={`${styles.iconButton} ${buttonClass}`} 
                    onClick={this.handleDeleteClick} title="Delete Feed">
                <FaTrash className={iconClass} />
            </button>
        );
    }
}