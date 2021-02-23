import React, { Component } from 'react';

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
            fontSize: '30px'
        };

        return(
            <React.Fragment>
                <button className={`${styles.iconButton} ${styles.controlsButton}`} 
                        onClick={this.handleEditClick} title="Edit Feed">
                    <i className="fas fa-edit fa-lg" style={iconStyle}></i>
                </button>
                {this.renderEditModal()}
            </React.Fragment>
        );
    }
}