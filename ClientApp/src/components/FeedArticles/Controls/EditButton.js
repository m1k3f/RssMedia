import React, { Component } from 'react';

export class EditButton extends Component {

    handleEditClick = (e) => {
        this.props.controlsCallback("edit");
    }

    render() {
        return(
            <a className="clickable" onClick={this.handleEditClick}>
                <i className="fas fa-edit fa-lg"></i>
            </a>
        );
    }
}