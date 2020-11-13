import React, { Component} from 'react';

export class FeedImageLink extends Component {

    render() {
        //let homepageLink = this.props.feed.;
        let imageUrl = (this.props.selectedFeed.feedImageUrl !== '') 
                        ? decodeURIComponent(this.props.selectedFeed.feedImageUrl) 
                        : '';

        return(
            // <a href={homepageLink}>
            //     <img src={imageUrl} />
            // </a>
            <img src={imageUrl} alt="" />
        );
    }
}