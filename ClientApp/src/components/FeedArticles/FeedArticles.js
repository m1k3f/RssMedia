import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';
import { Article } from './Article';
import { FeedArticlesControls } from './FeedArticlesControls';
import { FeedTitle } from './Controls/FeedTitle';

export class FeedArticles extends Component {

    constructor(props) {
        super(props);      
    }    

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
            content = (
                <div className="divFeedArticlesLoading">
                    <i className="fas fa-spinner fa-spin fa-2x"></i>  
                </div>              
            );            
        }
        else {
            content = (
                <div className="divFeedArticles">
                    <FeedTitle title={this.getFeedTitle()} />
                    <section>
                        <FeedArticlesControls feed={this.context.selectedFeed} />
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
            content = selectedFeed.feedArticles.map((article) => {                           
                return (                    
                    <Article 
                        key = {article.id}  
                        data = {article} 
                        feedLastAccessed = {selectedFeed.lastAccessed}
                        feedFirstAccess = {selectedFeed.firstAccess}
                    />                    
                );
            });
        }

        return(
            <div className="divFeedArticlesList">
                {content}
            </div>
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.renderFeedArticles()}
            </React.Fragment>
        );
    }
}