import React, { Component } from 'react';

export class DeleteFeedsButton extends Component {

    handleDeleteButtonClick = (e) => {

    }

    render() {
        return (
            <React.Fragment>
                <button onClick={this.handleDeleteButtonClick} title="Delete">
                    <i className="fas fa-trash fa-2x"></i>
                </button>
            </React.Fragment>
        );
    }
}