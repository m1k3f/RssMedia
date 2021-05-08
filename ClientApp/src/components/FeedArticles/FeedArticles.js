import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import FeedContext from '../context/FeedContext';
import { Article } from './Article';
import { FeedArticlesControls } from './FeedArticlesControls';
import { FeedTitle } from './Controls/FeedTitle';
import styles from './FeedArticles.module.css';

export class FeedArticles extends Component { 

    static contextType = FeedContext;

    getFeedTitle = () => {
        let feedTitle = '';
        if (this.context != null && this.context.selectedFeed != null) {
            if (this.context.selectedFeed.feedTitle != null) {
                feedTitle = this.context.selectedFeed.feedTitle
            }
            else if (this.context.selectedFeed.feedName != null) {
                feedTitle = this.context.selectedFeed.feedName;
            }
        }

        return (feedTitle);
    }

    renderFeedArticles = () => {
        let content = null;
        const { selectedFeed, selectedFeedLoading } = this.context;

        if (selectedFeedLoading) {
            let iconStyle = {
                width: '30px',
                height: '30px'
            };

            content = (
                <div className={styles.divFeedArticlesLoading}>
                    <FaSpinner className="spin" style={iconStyle} />
                </div>              
            );            
        }
        else {
            let articlesExist = (selectedFeed != null && selectedFeed.feedArticles != null);
            let divClass = articlesExist ? styles.divFeedArticles : styles.divFeedArticlesEmpty;             

            content = (
                <div className={divClass}>
                    <FeedTitle title={this.getFeedTitle()} />
                    <section className={styles.feedControlsArticles}>
                        <FeedArticlesControls feed={selectedFeed} />
                        {this.renderArticles(selectedFeed)}
                    </section>                    
                </div>
            );
        }

        return (content);
    }

    renderArticles = (selectedFeed) => {        
        let content = null;
        if (selectedFeed != null && selectedFeed.feedArticles != null) {
            let articles = selectedFeed.feedArticles.map((article) => {                           
                return (                    
                    <Article 
                        key = {article.id}  
                        data = {article} 
                        feedLastAccessed = {selectedFeed.lastAccessed}
                        feedFirstAccess = {selectedFeed.firstAccess}
                    />                    
                );
            });

            content = (
                <div className={styles.divFeedArticlesList}>
                    {articles}
                </div>
            );
        }

        return(content);
    }

    render() {
        return (
            <React.Fragment>
                {this.renderFeedArticles()}
            </React.Fragment>
        );
    }
}