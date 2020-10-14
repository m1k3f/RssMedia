import React, { Component } from 'react';
import { FeedProvider } from './context/FeedContext';
import { FeedBar } from './FeedBar';
import { FeedArticles } from './FeedArticles';

export class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    render() {
        return (
            <main>
                <FeedProvider>
                    <FeedBar />
                    <FeedArticles />                
                </FeedProvider>
            </main>
        );
    }
}