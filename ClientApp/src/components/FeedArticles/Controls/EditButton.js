import React, { Component } from 'react';
import { EditFeed } from '../modals/EditFeed';

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
        
        if (updatedFeedLink != null) {
            let editOption = {
                type: 'edit',
                feedLink: updatedFeedLink
            }

            this.props.controlsCallback(editOption);
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
        return(
            <React.Fragment>
                <a className="clickable" onClick={this.handleEditClick}>
                    <i className="fas fa-edit fa-lg"></i>
                </a>
                {this.renderEditModal()}
            </React.Fragment>
        );
    }
}