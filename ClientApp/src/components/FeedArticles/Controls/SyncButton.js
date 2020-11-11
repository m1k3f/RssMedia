import React, { Component } from 'react';

export class SyncButton extends Component {

    state = {
        spin: false
    }

    handleSyncClick = (e) => {
        this.animateButton(true);
        this.props.controlsCallback("sync");
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