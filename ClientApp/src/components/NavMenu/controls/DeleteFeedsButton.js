import React, { Component } from 'react';

export class DeleteFeedsButton extends Component {

    handleDeleteButtonClick = (e) => {

    }

    render() {
        return (
            <button onClick={this.handleDeleteButtonClick}>
                Delete All Feeds
            </button>
        );
    }
}