import React, { Component } from 'react';
import { FaEdit } from 'react-icons/fa';

import { EditFeed } from '../modals/EditFeed';
import styles from './FeedArticleControls.module.css';

export class EditButton extends Component {

    state = {
        showEditModal: false
    }

    handleEditClick = (e) => {
        this.setState({
            showEditModal: true
        });
    }

    handleEditFeedCallback = (updatedFeedLink) => {
        this.setState({
            showEditModal: false
        });

        if (updatedFeedLink !== null) {
            let editObject = {
                action: 'edit',
                feedLink: updatedFeedLink
            };

            this.props.controlsCallback(editObject);
        }
    }    

    renderEditModal = () => {
        if (this.state.showEditModal) {
            return (
                <EditFeed feed = {this.props.selectedFeed}
                            editFeedCallback = {this.handleEditFeedCallback} />
            );
        }
    }

    render() {
        let iconStyle = {
            width: '32px',
            height: '32px'
        };

        return(
            <React.Fragment>
                <button className={`${styles.iconButton} ${styles.controlsButton}`} 
                        onClick={this.handleEditClick} title="Edit Feed">
                    <FaEdit style={iconStyle} />
                </button>
                {this.renderEditModal()}
            </React.Fragment>
        );
    }
}