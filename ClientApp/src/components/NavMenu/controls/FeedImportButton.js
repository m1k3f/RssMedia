import React, { Component } from 'react';

export class FeedImportButton extends Component {

    handleFeedsImport = (e) => {
        //this.props.settingsCallback("feedsImport");
    } 

    render() {
        return(
            <React.Fragment>                
                <button onClick={this.handleFeedsImport} title="Import">                
                    <i className="fas fa-file-upload fa-2x"></i>
                </button>
            </React.Fragment>
        );
    }
}