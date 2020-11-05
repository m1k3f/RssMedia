import React, { Component, Fragment } from 'react';

export class FeedImageLink extends Component {

    render() {
        //let homepageLink = this.props.feed.;
        let imageUrl = (this.props.feed.feedImageUrl != '') 
                        ? decodeURIComponent(this.props.feed.feedImageUrl) 
                        : '';

        return(
            // <a href={homepageLink}>
            //     <img src={imageUrl} />
            // </a>
            <img src={imageUrl} />
        );
    }
}