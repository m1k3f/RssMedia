import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import FeedContext from '../../context/FeedContext';
import styles from '../NavMenu.module.css';

export class DeleteFeedsButton extends Component {

    static contextType = FeedContext;

    state = {
        isLoading: false
    }

    handleDeleteButtonClick = async (e) => {
        this.showSpinner(true);

        await this.wait(2000);

        // let option = {
        //     action: 'feedsDelete'
        // }
        // this.props.settingsCallback(option);
        this.removeAllFeeds();

        this.showSpinner(false);
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
    }

    wait = async (milliseconds) => {
        await new Promise(r => setTimeout(r, milliseconds));
    }

    removeAllFeeds = () => {
        const { setFeed, feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
        let feedLinkSettingsCopy = {...feedLinksSettings};        
        feedLinkSettingsCopy.feedLinks.length = 0;
        saveAndRefreshFeedLinks(feedLinkSettingsCopy);
        setFeed(null);
    }

    renderButton = () => {
        let content = null;

        if (this.state.isLoading) {
            let spinnerStyle = { paddingTop: '8px', paddingBottom: '8px' };
            content = (
                <div className={styles.headerButtonCenter} style={{spinnerStyle}}>
                    <FaSpinner style={this.props.iconStyle} className="spin" />
                </div>
            );
        }
        else {
            let buttonStyle = { paddingLeft: '16px', paddingRight: '16px' };
            content = (                
                <button className={`${styles.headerButtonCenter} ${styles.iconButton}`} 
                        style={{buttonStyle}} onClick={this.handleDeleteButtonClick}>
                    {this.props.children}
                </button>
            );
        }

        return content;
    }

    render() {        
        return (
            <div>
                {this.renderButton()}
            </div>
        );
    }
}