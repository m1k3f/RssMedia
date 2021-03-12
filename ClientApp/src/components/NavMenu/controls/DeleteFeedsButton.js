import React, { Component } from 'react';
import { FaTrash } from 'react-icons/fa';

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
            width: '17px',
            height: '17px'
        };

        return (
            <React.Fragment>
                <button className={`${styles.headerButtonCenter} ${styles.iconButton}`} 
                        onClick={this.handleDeleteButtonClick} title="Delete All Feeds">
                    {/* <i className={`fas fa-trash fa-2x`} style={iconStyle}></i> */}
                    <FaTrash style={iconStyle} />
                </button>
            </React.Fragment>
        );
    }
}