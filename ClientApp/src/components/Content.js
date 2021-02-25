import React, { Component } from 'react';

import FeedContext from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';
import { HelpInfoMain } from './HelpInfoMain';
import styles from './Content.module.css';

export class Content extends Component {

    static contextType = FeedContext;

    renderItem = () => {
        const { selectedFeed, selectedFeedLoading } = this.context;
        let content = null;
        
        if (selectedFeed === null && !selectedFeedLoading) {
            content = (
                <HelpInfoMain />
            );
        }
        else {
            content = (
                <FeedArticles />
            );
        }

        return (content);
    }

    render() {
        return (
            <main className={styles.mainContent}>
                <FeedBar />
                {this.renderItem()}
            </main>
        );
    }
}