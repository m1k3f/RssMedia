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
        //this.props.controlsCallback("edit");
    }

    handleEditFeedCallback = (updatedFeedLink) => {
        if (updatedFeedLink != null) {
            
        }

        this.setState({
            showEditModal: false
        });
    }

    renderEditModal = (show) => {
        if (show) {
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
                {this.renderEditModal(this.state.showEditModal)}
            </React.Fragment>
        );
    }
}