import React, { Component } from 'react';
import FeedContext from '../context/FeedContext';
import { Spinner } from './Controls/Spinner';
import { Article } from './Article';
import { FeedArticlesControls } from './FeedArticlesControls';
import { FeedTitle } from './Controls/FeedTitle';

export class FeedArticles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFeed: null,
            hideSpinner: true,
            showLinkFrame: false
        }        
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

    renderSpinner = () => {
        return (<Spinner hide={this.state.hideSpinner} />);
    }

    renderArticles = () => {        
        let content = '';
        const feedContext = this.context;

        if (feedContext != null && feedContext.selectedFeed != null && 
            feedContext.selectedFeed.feedArticles != null) {           

            content = feedContext.selectedFeed.feedArticles.map((article) => {                           
                return (
                    <Article 
                        key = {article.id}  
                        data = {article} 
                        feedLastAccessed = {feedContext.selectedFeed.lastAccessed}
                        feedFirstAccess = {feedContext.selectedFeed.firstAccess}
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
            <div className="divFeedArticles">
                <FeedTitle title={this.getFeedTitle()} />
                <section>
                    <FeedArticlesControls feed = {this.context.selectedFeed} />
                    {this.renderArticles()}
                </section>
            </div>
        );
    }
}