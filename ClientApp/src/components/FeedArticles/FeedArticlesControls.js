import React, { Component, Fragment } from 'react';
import { SyncButton } from './Controls/SyncButton';
import { EditButton } from './Controls/EditButton';
import { DeleteButton } from './Controls/DeleteButton';

export class FeedArticlesControls extends Component {
    
    handleButtonClick = (option) => {
        this.props.feedArticlesCallback(option);
    }

    renderControls = () => {
        let hideDiv = (this.props.feed == null);
        let content = null;
        if (!hideDiv) {
            let imageUrl = (this.props.feed.feedImageUrl != '') ? decodeURIComponent(this.props.feed.feedImageUrl) : '';
            content = (
                <div className="divFeedArticlesControls">
                    {/* 
                        Feed Title (left)
                        Sync Feed button (right)
                        Edit Feed button (right)
                        Delete Feed button (right)
                    */}
                    <p>{this.props.feed.feedTitle}</p>
                    <img src={imageUrl} />
                    <div>
                        <SyncButton controlsCallback = {this.handleButtonClick} />
                        <EditButton controlsCallback = {this.handleButtonClick} 
                                    selectedFeed = {this.props.feed} />
                        <DeleteButton controlsCallback = {this.handleButtonClick} />
                    </div>
                </div>
            );
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