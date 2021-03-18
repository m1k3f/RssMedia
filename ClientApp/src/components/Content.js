import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

import FeedContext from './context/FeedContext';
import { FeedBar } from './FeedBar/FeedBar';
import { FeedArticles } from './FeedArticles/FeedArticles';
import { HelpInfoMain } from './HelpInfoMain';
import { FeedLinkAddMain } from './FeedLinkAddMain';
import { FeedLinkAdd } from './FeedBar/FeedLinkAdd';

import styles from './Content.module.css';

export class Content extends Component {

    static contextType = FeedContext;

    renderItem = () => {
        const { feedLinksSettings, selectedFeed, selectedFeedLoading } = this.context;
        let content = null;
        
        if (selectedFeed === null && !selectedFeedLoading) {
            let iconStyle = {    
                color: '#29a3a3',        
                width: '40px',
                height: '40px'
            };

            content = (
                <div className={styles.divMainContentButtons}>
                    {/* <FeedLinkAddMain /> */}
                    <FeedLinkAdd iconStyle={iconStyle}>
                        <FaPlus style={iconStyle} />
                        <p className={styles.divMainContentButtonText}>Add Feed</p>
                    </FeedLinkAdd>
                    <HelpInfoMain />                    
                </div>
            );
        }
        else {
            content = (
                <FeedArticles />
            );
        }

        return (content);
    }

    render() {
        return (
            <main className={styles.mainContent}>
                <FeedBar />
                {this.renderItem()}
            </main>
        );
    }
}