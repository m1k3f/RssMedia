import React, { Component } from 'react';

export class DeleteFeedsButton extends Component {

    handleDeleteButtonClick = (e) => {
        this.showSpinner(true);

        let option = {
            action: 'feedsDelete'
        }
        this.props.settingsCallback(option);

        this.showSpinner(false);
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
    }

    render() {
        return (
            <React.Fragment>
                <button className="iconButton" onClick={this.handleDeleteButtonClick} title="Delete All Feeds">
                    <i className="fas fa-trash fa-2x"></i>
                </button>
            </React.Fragment>
        );
    }
}