import React, { Component } from 'react';
import { FeedBar } from './FeedBar';
import { FeedArticles } from './FeedArticles';

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

//export default Content;