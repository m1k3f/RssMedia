import React, { Component } from 'react';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';

export class Content extends Component {
    render() {
        return (
            <main>                
                <FeedBar />
                <FeedArticles />
            </main>
        );
    }
}