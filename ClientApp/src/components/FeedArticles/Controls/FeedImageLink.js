import React, { Component} from 'react';

export class FeedImageLink extends Component {

    renderImage = () => {
        let image = '';
        if (this.props.selectedFeed.feedRssUrl.includes("youtube.com")) {
            image = (
                <i className="fab fa-youtube"></i>
            );            
        }
        else if (this.props.selectedFeed.feedImageUrl != null && this.props.selectedFeed.feedImageUrl.length > 0) {
            let imageUrl = decodeURIComponent(this.props.selectedFeed.feedImageUrl);            
            image = (
                <img src={imageUrl} alt="" />
            );
        }
        
        return (image);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderImage()}
            </React.Fragment>
        );
    }
}