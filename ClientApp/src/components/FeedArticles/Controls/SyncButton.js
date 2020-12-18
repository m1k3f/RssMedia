import React, { Component } from 'react';
import FeedContext from '../../context/FeedContext';

export class SyncButton extends Component {

    state = {
        spin: false
    }

    static contextType = FeedContext;

    handleSyncClick = (e) => {
        const {feedLinksSettings} = this.context;
        this.animateButton(true);        
        
        let feedLinkId = this.props.selectedFeed.feedLinkId;
        let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => link.id === feedLinkId);
        let feedLink = null;
        if (linkIndex > -1) {
            feedLink = feedLinksSettings.feedLinks[linkIndex];
        }

        let option = {
            action: 'sync',
            feedLink: feedLink
        };

        this.props.controlsCallback(option);        
        
        this.animateButton(false);
    }

    animateButton = (spin) => {
        this.setState({
            spin: spin
        });
    }

    render() {
        let iconClass = (this.state.spin) ? 
                        'fas fa-sync-alt fa-spin fa-lg' : 
                        'fas fa-sync-alt fa-lg';

        return(
            <a className="clickable" onClick={this.handleSyncClick}>
                <i className={iconClass}></i>
            </a>
        );
    }
}