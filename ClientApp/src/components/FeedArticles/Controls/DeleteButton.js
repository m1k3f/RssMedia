import React, { Component } from 'react';

export class DeleteButton extends Component {

    handleDeleteClick = (e) => {
        //TODO: modal popup: Are you sure you want to to delete?
        // if true, then do call back.
        this.props.controlsCallback("delete");
    }

    render() {
        return(
            <a className="clickable" onClick={this.handleDeleteClick}>
                <i className="fas fa-trash fa-lg"></i>
            </a>
        );
    }
}