import React, { Component, Fragment } from 'react';
import { SyncButton } from './Controls/SyncButton';
import { EditButton } from './Controls/EditButton';
import { DeleteButton } from './Controls/DeleteButton';

export class FeedArticlesControls extends Component {
    
    handleButtonClick = (option) => {
        this.props.feedArticlesCallback(option);
    }

    renderControls = () => {
        let hideDiv = (this.props.feedTitle.length === 0);
        let content = null;
        if (!hideDiv) {
            content = (
                <div className="divFeedArticlesControls">
                    {/* 
                        Feed Title (left)
                        Sync Feed button (right)
                        Edit Feed button (right)
                        Delete Feed button (right)
                    */}
                    <p>{this.props.feedTitle}</p>
                    <div>
                        <SyncButton controlsCallback = {this.handleButtonClick} />
                        <EditButton controlsCallback = {this.handleButtonClick} />
                        <DeleteButton controlsCallback = {this.handleButtonClick} />
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