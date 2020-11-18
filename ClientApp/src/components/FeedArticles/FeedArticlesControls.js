import React, { Component} from 'react';
import { SyncButton } from './Controls/SyncButton';
import { EditButton } from './Controls/EditButton';
import { DeleteButton } from './Controls/DeleteButton';
import { FeedImageLink } from './Controls/FeedImageLink';

export class FeedArticlesControls extends Component {
    
    handleButtonClick = (option) => {
        option.selectedFeed = this.props.feed;
        this.props.feedArticlesCallback(option);
    }

    renderControls = () => {
        let hideDiv = (this.props.feed == null);
        let content = null;
        if (!hideDiv) {
            // let imageUrl = (this.props.feed.feedImageUrl != '') ? decodeURIComponent(this.props.feed.feedImageUrl) : '';
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