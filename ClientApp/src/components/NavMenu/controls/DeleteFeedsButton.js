import React, { Component } from 'react';

export class DeleteFeedsButton extends Component {

    handleDeleteButtonClick = (e) => {
        this.props.settingsCallback("feedsDelete");
    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.handleDeleteButtonClick} title="Delete All">
                    <i className="fas fa-trash fa-2x"></i>
                </button>
            </React.Fragment>
        );
    }
}