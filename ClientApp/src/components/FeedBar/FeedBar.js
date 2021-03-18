import React, { Component } from 'react';
import { FaPlus } from 'react-icons/fa';

import FeedContext from '../context/FeedContext';
import { FeedLinkAdd } from './FeedLinkAdd';
import { FeedLinkAll } from './FeedLinkAll';
import { FeedLinks } from './FeedLinks';
import styles from './FeedBar.module.css';

export class FeedBar extends Component {

    static contextType = FeedContext;

    renderFeedLinkButtons = () => {
        let content = '';
        const feedContext = this.context;
        let feedLinks = [...feedContext.feedLinksSettings.feedLinks];

        if (feedLinks.length > 0) {
            content = (
                <React.Fragment>
                    <FeedLinkAll links = {feedLinks} />
                    <FeedLinks 
                        links = {feedLinks} 
                    />
                </React.Fragment>
            );
        }

        return (content);
    }

    render() {
        const { feedLinksSettings } = this.context;
        let divStyle = null;
        if (feedLinksSettings.feedLinks.length > 0) {
            divStyle = {
                visibility: 'visible'
            };
        }
        else {
            divStyle = {
                visibility: 'hidden'
            };
        }

        let iconStyle = {
            color: '#29a3a3',
            width: '20px',
            height: '20px'
        };

        return (
            <div className={styles.divFeedBar} style={divStyle}>
                <div style={{borderRight: '2px solid #333333'}}>
                    <FeedLinkAdd iconStyle={iconStyle}>
                        <FaPlus style={iconStyle} title="Add Feed" />
                    </FeedLinkAdd>
                </div>
                {this.renderFeedLinkButtons()}
            </div>
        );
    }
}

//export default FeedBar;