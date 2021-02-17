import React, { Component } from 'react';

import styles from './FeedArticleControls.module.css';

export class FeedTitle extends Component {

    render() {
        return(
            <div className={styles.divFeedTitle}>
                {this.props.title}
            </div>
        );
    }
}