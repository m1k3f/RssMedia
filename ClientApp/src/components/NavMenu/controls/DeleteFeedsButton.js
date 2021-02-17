import React, { Component } from 'react';

import styles from '../NavMenu.module.css';

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
        let iconStyle = {
            fontSize: '17px'
        };

        return (
            <React.Fragment>
                <button className={`${styles.headerButtonCenter} iconButton`} onClick={this.handleDeleteButtonClick} title="Delete All Feeds">
                    <i className={`fas fa-trash fa-2x`} style={iconStyle}></i>
                </button>
            </React.Fragment>
        );
    }
}