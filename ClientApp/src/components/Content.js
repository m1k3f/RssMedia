import React, { Component } from 'react';

class Content extends Component {

    render() {
        return (
            <main>
                <FeedBar />
                <FeedArticles />
            </main>
        );
    }
}

export default Content;