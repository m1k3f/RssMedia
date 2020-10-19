import React, { Component } from 'react';
import FeedContext from './context/FeedContext';
import { Spinner } from './Spinner';
import { Article } from './Article';
import { FeedArticlesControls } from './FeedArticlesControls';

export class FeedArticles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFeed: null,
            hideSpinner: true
        }        
    }    

    static contextType = FeedContext;    

    handleContentCallback = (option) => {
        let feedLink = this.context.selectedFeed;
        this.props.contentCallback(feedLink, option);
    }    

    renderSpinner = () => {
        return (<Spinner hide={this.state.hideSpinner} />);
    }

    renderArticles = () => {        
        let content = '';
        const feedContext = this.context;

        if (feedContext != null && feedContext.selectedFeed != null) {           

            let articleCount = 0;
            content = feedContext.selectedFeed.feedArticles.map((article) => {
                articleCount++;            
                return (<Article key = {article.id} count = {articleCount} data = {article} />);
            });
        }

        return(
            <div>
                {content}
            </div>
        );
    }

    render() {
        let feedTitle = (this.context.selectedFeed != null) ? this.context.selectedFeed.feedTitle : '';

        return (
            <div className="divFeedArticles">
                {/* 
                    Show X number articles for a feed 
                    list of title containers expandable to show content
                    button to load more articles from service
                */}
                {/* <div className="divFeedArticleControls" /> */}
                {/* <div className="divSpinner" hidden>
                    <i className="fas fa-spinner fa-spin fa-lg"></i>
                </div> */}
                <FeedArticlesControls 
                    feedTitle = {feedTitle} 
                    feedArticlesCallback = {this.handleContentCallback} />
                {this.renderArticles()}
                              
            </div>
        );
    }
}