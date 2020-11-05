import React, { Component, Fragment } from 'react';

export class FeedTitle extends Component {

    render() {
        return(
            <div className="divFeedTitle">
                {this.props.title}
            </div>
        );
    }
}