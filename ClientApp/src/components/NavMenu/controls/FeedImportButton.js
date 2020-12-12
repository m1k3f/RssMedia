import React, { Component } from 'react';

export class FeedImportButton extends Component {
    handleFeedsImport = (e) => {
        
    } 

    render() {
        return(
            <button onClick={this.handleFeedsImport}>
                Import Feeds
            </button>
        );
    }
}