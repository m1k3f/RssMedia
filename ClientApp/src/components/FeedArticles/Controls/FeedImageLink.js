import React, { Component} from 'react';

export class FeedImageLink extends Component {

    renderImage = () => {
        let image = '';
        let selectedFeed = this.props.selectedFeed;
        if (selectedFeed === null || selectedFeed.feedImageUrl.length === 0 || 
            selectedFeed.feedRssUrl.length === 0) {
            image = (
                <i className="fas fa-rss"></i>
            ); 
        }
        else if (selectedFeed.feedRssUrl.includes("youtube.com")) {
            image = (
                <i className="fab fa-youtube"></i>
            );            
        }
        else if (selectedFeed.feedImageUrl != null && selectedFeed.feedImageUrl.length > 0) {
            let imageUrl = decodeURIComponent(selectedFeed.feedImageUrl);            
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