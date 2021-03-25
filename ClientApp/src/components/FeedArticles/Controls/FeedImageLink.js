import React, { Component} from 'react';
import { FaRss, FaYoutube } from 'react-icons/fa';

import styles from './FeedArticleControls.module.css';

export class FeedImageLink extends Component {

    renderImage = () => {
        let image = '';
        let selectedFeed = this.props.selectedFeed;

        if (selectedFeed === null || selectedFeed.feedRssUrl.length === 0) {
            image = (
                <FaRss className={styles.controlsImageIcon} />
            ); 
        }
        else if (selectedFeed.feedRssUrl.includes("youtube.com")) {
            image = (
                <FaYoutube className={styles.controlsImageIcon} />
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