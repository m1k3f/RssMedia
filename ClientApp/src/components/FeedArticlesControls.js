import React, { Component, Fragment } from 'react';

export class FeedArticlesControls extends Component {

    state = {
        showControls: false
    }

    handleSyncClick = (e) => {
        this.props.feedArticlesCallback("sync");
    }

    handleEditClick = (e) => {
        this.props.feedArticlesCallback("edit");
    }

    handleDeleteClick = (e) => {
        this.props.feedArticlesCallback("delete");
    }

    renderControls = () => {
        let hideDiv = (this.props.feedTitle.length === 0);
        let content = null;
        if (!hideDiv) {
            content = (
                <div className="divFeedArticlesControls">
                    {/* 
                        Feed Title (left)
                        Edit Feed button (right)
                        Delete Feed button (right)
                    */}
                    <p>{this.props.feedTitle}</p>
                    <div>
                        <a className="clickable" onClick={this.handleSyncClick}>
                            <i className="fas fa-sync-alt fa-lg"></i>
                        </a>
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

        return(content);
    }

    render() {
        return(
            <React.Fragment>
                {this.renderControls()}
            </React.Fragment>
            // <div className="divFeedArticlesControls">
            //     {/* 
            //         Feed Title (left)
            //         Edit Feed button (right)
            //         Delete Feed button (right)
            //     */}
            //     <p>{this.props.feedTitle}</p>
            //     <div>
            //         <a className="clickable" onClick={this.handleEditClick}>
            //             <i className="fas fa-edit fa-lg"></i>
            //         </a>
            //         <a className="clickable" onClick={this.handleDeleteClick}>
            //             <i className="fas fa-trash fa-lg"></i>
            //         </a>
            //     </div>
            // </div>
        );
    }
}