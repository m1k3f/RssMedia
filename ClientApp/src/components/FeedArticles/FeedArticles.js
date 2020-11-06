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
            hideSpinner: true
        }        
    }    

    static contextType = FeedContext;    

    handleContentCallback = (option) => {
        let feed = this.context.selectedFeed;

        if (option === 'delete') {
            const {setFeed} = this.context;
            setFeed(null);
        }

        this.props.contentCallback(feed, option);
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
            <div className="divFeedArticlesList">
                {content}
            </div>
        );
    }

    render() {
        let feedTitle = (this.context != null && this.context.selectedFeed != null) 
                        ? this.context.selectedFeed.feedTitle 
                        : '';


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
                <FeedTitle title={feedTitle} />
                <section>
                    <FeedArticlesControls
                        feed = {this.context.selectedFeed}
                        feedArticlesCallback = {this.handleContentCallback} />
                    {this.renderArticles()}
                </section>
                              
            </div>
        );
    }
}