import React, { Component } from 'react';
import { FaSpinner } from 'react-icons/fa';

import FeedContext from '../../context/FeedContext';
import styles from '../NavMenu.module.css';

export class FeedImportButton extends Component {

    static contextType = FeedContext;

    state = {
        isLoading: false
    }

    handleFeedsImport = async (e) => {
        if (this.props.isSample) {
            await this.handleSampleFile();
        }
        else {
            this.fileImport.click();
        }        
    }

    handleSampleFile = async () => {
        this.showSpinner(true);

        let sampleData = this.getSampleFileContents();
        let fileFeedLinksArray = this.getFileFeedLinksArray(sampleData);
        let feedLinksData = await this.getFeedLinksData(fileFeedLinksArray);
        this.saveFeedLinks(feedLinksData);

        this.showSpinner(false);
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

    getSampleFileContents = () => {
        //better way of hardcoding sample data?
        let sample = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\r\n<opml version=\"2.0\">\n  <head>\n    <title>FeedReader</title>\n    <dateModified>6/23/2021 11:54:13 AM</dateModified>\n  </head>\n  <body>\n    <outline text=\"NPR News\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://feeds.npr.org/1001/rss.xml\" />\n    <outline text=\"NPR News Now Podcast\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://feeds.npr.org/500005/podcast.xml\" />\n    <outline text=\"NPR TED Radio Hour Podcast\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://feeds.npr.org/510298/podcast.xml\" />\n    <outline text=\"New York Times\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://rss.nytimes.com/services/xml/rss/nyt/HomePage.xml\" />\n    <outline text=\"Wall Street Journal Minute Briefing Podcast\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://video-api.wsj.com/podcast/rss/wsj/minute-briefing\" />\n    <outline text=\"Wall Street Journal Youtube\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://www.youtube.com/feeds/videos.xml?user=WSJDigitalNetwork\" />\n    <outline text=\"Associated Press Youtube\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://www.youtube.com/feeds/videos.xml?channel_id=UC52X5wxOL_s5yw0dQk7NtgA\" />\n    <outline text=\"Arstechnica\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"http://feeds.arstechnica.com/arstechnica/index/\" />\n    <outline text=\"CBC World This Hour Podcast\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://www.cbc.ca/podcasting/includes/hourlynews.xml\" />\n    <outline text=\"Smitten Kitchen\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"http://feeds.feedburner.com/smittenkitchen\" />\n    <outline text=\"Krebs on Security\" type=\"rss\" htmlUrl=\"\" xmlUrl=\"https://krebsonsecurity.com/feed/\" />\n  </body>\n</opml>"
        return sample;
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
            content = (
                <div className={styles.headerButtonCenter}>
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