import React, { Component } from 'react';
import { FaFileDownload, FaSpinner } from 'react-icons/fa'; 

import FeedContext from '../../context/FeedContext';
import styles from '../NavMenu.module.css';

export class FeedExportButton extends Component {

    state = {
        isLoading: false
    }

    static contextType = FeedContext;

    handleFeedsExport = async (e) => {
        this.showSpinner(true);

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
        let iconStyle = {
            width: '17px',
            height: '17px',
            marginRight: '4px'
        };

        if (this.state.isLoading) {
            content = (
                <FaSpinner style={iconStyle} className="spin" />
            );
        }
        else {
            content = (
                <button className={`${styles.headerButtonCenter} ${styles.iconButton}`} 
                        onClick={this.handleFeedsExport} title="Export Feeds">
                    <FaFileDownload style={iconStyle} />
                </button>
            );
        }

        return content;
    }

    render() {
        return(            
            <React.Fragment>
                {this.renderButton()}
            </React.Fragment>
        );
    }
}