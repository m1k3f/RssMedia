import React, { Component } from 'react';

import FeedContext from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';
import { HelpInfoMain } from './HelpInfoMain';

export class Content extends Component {

    static contextType = FeedContext;

    renderItem = () => {
        const { feedLinksSettings } = this.context;
        let content = null;
        if (feedLinksSettings.feedLinks.length > 0)
        {
            content = (
                <FeedArticles />
            );
        }
        else {
            content = (
                <HelpInfoMain />
            );
        }

        return (content);
    }

    render() {
        return (
            <main>                
                <FeedBar />
                {this.renderItem()}
            </main>
        );
    }
}