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
            <button onClick={this.handleFeedsExport}>
                Export Feeds
            </button>
        );
    }
}