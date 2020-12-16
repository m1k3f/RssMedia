import React, { Component } from 'react';

export class FeedExportButton extends Component {
    handleFeedsExport = (e) => {
        //get all feedlinks from browser storage
        //create feedlink list
        //create feeds object with feedlink list
        //call service method that dreates and downloads opml export file
    }

    render() {
        return(            
            <React.Fragment>
                <button onClick={this.handleFeedsExport} title="Export">
                    <i className="fas fa-file-download fa-2x"></i>
                </button>
            </React.Fragment>
        );
    }
}