import React, { Component } from 'react';

export class SyncButton extends Component {

    handleSyncClick = (e) => {
        this.props.controlsCallback("sync");
    }

    render() {
        return(
            <a className="clickable" onClick={this.handleSyncClick}>
                <i className="fas fa-sync-alt fa-lg"></i>
            </a>
        );
    }
}