import React, { Component } from 'react';

export class DeleteButton extends Component {

    handleDeleteClick = (e) => {
        this.props.feedArticlesCallback("delete");
    }

    render() {
        return(
            <a className="clickable" onClick={this.handleDeleteClick}>
                <i className="fas fa-trash fa-lg"></i>
            </a>
        );
    }
}