import React, { Component } from 'react';

export class FeedArticlesControls extends Component {

    handleEditClick = (e) => {
        this.props.feedArticlesCallback("edit");
    }

    handleDeleteClick = (e) => {
        this.props.feedArticlesCallback("delete");
    }

    render() {
        let hideDiv = (this.props.feedTitle.length === 0);

        return(
            <div className="divFeedArticlesControls" hidden={hideDiv}>
                {/* 
                    Feed Title (left)
                    Edit Feed button (right)
                    Delete Feed button (right)
                */}
                <p>{this.props.feedTitle}</p>
                <div>
                    <a className="clickable" onClick={this.handleEditClick}>
                        <i className="fas fa-edit fa-lg"></i>
                    </a>
                    <a className="clickable" onClick={this.handleDeleteClick}>
                        <i className="fas fa-trash fa-lg"></i>
                    </a>
                </div>
            </div>
        );
    }
}