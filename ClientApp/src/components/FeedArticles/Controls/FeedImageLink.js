import React, { Component} from 'react';

import styles from './FeedArticleControls.module.css';

export class FeedImageLink extends Component {

    renderImage = () => {
        let image = '';
        let selectedFeed = this.props.selectedFeed;
        let iconStyle = {
            marginBottom: '30px',
            fontSize: '40px',
            color: '#fc0505'
        };

        if (selectedFeed === null || selectedFeed.feedRssUrl.length === 0) {
            image = (
                <i className="fas fa-rss" style={iconStyle}></i>
            ); 
        }
        else if (selectedFeed.feedRssUrl.includes("youtube.com")) {
            image = (
                <i className="fab fa-youtube" style={iconStyle}></i>
            );            
        }
        else if (selectedFeed.feedImageUrl != null && selectedFeed.feedImageUrl.length > 0) {
            let imageUrl = decodeURIComponent(selectedFeed.feedImageUrl);            
            image = (
                <img className={styles.controlsImage} src={imageUrl} alt="" />
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