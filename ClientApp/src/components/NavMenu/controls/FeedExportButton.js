import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa'; 

import FeedContext from '../../context/FeedContext';
import styles from '../NavMenu.module.css';

export class FeedExportButton extends Component {

    state = {
        isLoading: false
    }

    static contextType = FeedContext;

    handleFeedsExport = async (e) => {
        this.showSpinner(true);

        await this.wait(1000);

        //get all feedlinks from browser storage
        const { feedLinksSettings } = this.context;

        //create feedlink list
        let feedLinkObjectArray = feedLinksSettings.feedLinks.map((link) => {
            let feedObject = {
                feedlinkid: link.id,
                feedrssurl: link.url,
                feedname: link.name
            }
            return feedObject;
        });

        //create feeds object with feedlink list
        let feeds = {
            feedlist: feedLinkObjectArray,
            feedarticleoffset: 0,
            feedarticlecount: 50
        };

        //call service method that creates and downloads opml export file
        this.downloadFeedsFile(feeds);

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

    downloadFeedsFile = async (feeds) => {
        let request = new Request(process.env.REACT_APP_APIDOWNLOADFEEDS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feeds)
        });

        await fetch(request)
                .then((response) => response.blob())
                .then((blob) => {
                    let url = URL.createObjectURL(blob);
                    let a = document.createElement('a');
                    a.href = url;
                    a.download = 'Feeds.opml';
                    a.click();                                      
                });
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
            content = (
                <button className={`${styles.headerButtonCenter} ${styles.iconButton}`} 
                        onClick={this.handleFeedsExport}>
                    {this.props.children}
                </button>
            );
        }

        return content;
    }

    render() {
        return(            
            <div>
                {this.renderButton()}
            </div>
        );
    }
}