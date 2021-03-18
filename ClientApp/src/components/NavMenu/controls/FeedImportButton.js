import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import FeedContext from '../../context/FeedContext';
import styles from '../NavMenu.module.css';

export class FeedImportButton extends Component {

    static contextType = FeedContext;

    state = {
        isLoading: false
    }

    handleFeedsImport = (e) => {
        this.fileImport.click();
    }

    handleFile = async (e) => {
        this.showSpinner(true);
        const file = e.target.files[0];

        await this.wait(1000);
        
        if (file) {
            //Read through file and set it to feedlinks
            let fileContents = await this.getFileContents(file);
            if (fileContents.length > 0) {
                let fileFeedLinksArray = this.getFileFeedLinksArray(fileContents);
                let feedLinksData = await this.getFeedLinksData(fileFeedLinksArray);

                this.saveFeedLinks(feedLinksData);
            }
        }

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

    getFileContents = (file) => {
        return new Promise((resolve, reject) => {
            let fileContents = '';
            const reader = new FileReader();        
            reader.onload = (e) => {
                fileContents = e.target.result;
                resolve(fileContents);
            }
            reader.onerror = (e) => {
                reject(e);
            }
            reader.readAsText(file);
        });        
    }

    getFileFeedLinksArray = (contentString) => {
        let xmlParser = new DOMParser();
        let xmlDoc = xmlParser.parseFromString(contentString, 'text/xml');

        let feedLinkArray = [];
        let outlineElements = xmlDoc.getElementsByTagName('outline');
        for (let i=0; i < outlineElements.length; i++) {
            if (outlineElements[i].getAttribute('xmlUrl') !== null) {
                //element is a feed
                feedLinkArray.push({
                    name: outlineElements[i].getAttribute('text'),
                    addUrl: outlineElements[i].getAttribute('xmlUrl'),
                    populateRemoteData: false
                });
            }
        }

        return feedLinkArray;
    }

    getFeedLinksData = async (feedLinkArray) => {
        let feedLinksData = [];        
        let request = new Request(process.env.REACT_APP_APIFEEDLINKSLIST, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feedLinkArray)
        });

        let serviceResponse = await fetch(request).then((response) => response.json());
        if (serviceResponse.length > 0) {
            serviceResponse.forEach((link) => {
                feedLinksData.push({
                    id: link.id,
                    title: link.title,
                    url: link.url,
                    name: link.name,
                    addUrl: link.addUrl,
                    position: link.position
                });
            });
        }

        return feedLinksData;
    }

    saveFeedLinks = (newFeedLinks) => {
        const { feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
        let feedLinkSettingsCopy = {...feedLinksSettings};
      
        feedLinkSettingsCopy.feedLinks.length = 0;
        newFeedLinks.forEach((newFeedLink) => {
            newFeedLink.position = (feedLinkSettingsCopy.feedLinks.length > 0) ? feedLinkSettingsCopy.feedLinks.length : 0;        
            feedLinkSettingsCopy.feedLinks.push(newFeedLink);
        });
      
        saveAndRefreshFeedLinks(feedLinkSettingsCopy);
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
                        style={{buttonStyle}} onClick={this.handleFeedsImport}>
                    {this.props.children}
                </button>
            );
        }

        return content;
    }

    render() {
        return(
            <div>
                <input type="file" style={{display:'none'}} accept=".opml"
                        ref={el => this.fileImport = el} onChange={this.handleFile} />
                {this.renderButton()}
            </div>
        );
    }
}