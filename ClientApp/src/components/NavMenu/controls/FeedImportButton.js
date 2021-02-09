import React, { Component } from 'react';

export class FeedImportButton extends Component {

    state = {
        isLoading: false
    }

    handleFeedsImport = (e) => {
        this.fileImport.click();
    }

    handleFile = async (e) => {
        this.showSpinner(true);

        let file = e.target.files[0];
        if (file) {
            //Read through file and set it to feedlinks
            let fileContents = await this.getFileContents(file);
            if (fileContents.length > 0) {
                let fileFeedLinksArray = this.getFileFeedLinksArray(fileContents);
                let feedLinksData = await this.getFeedLinksData(fileFeedLinksArray);

                let option = {
                    action: 'feedsImport',
                    newFeedLinks: feedLinksData
                }
                this.props.settingsCallback(option);
            }
        }

        this.showSpinner(false);
    }

    showSpinner = (show) => {
        this.setState({
            isLoading: show
        });
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
        let request = new Request('api/rssmedia/GetFeedLinksList', {
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

    renderButton = () => {
        let content = null;
        if (this.state.isLoading) {
            content = (
                <i className="fas fa-spinner fa-spin fa-2x" style={{marginRight: '4px'}}></i>
            );
        }
        else {
            content = (
                <button className="iconButton" style={{marginRight: '4px'}} 
                        onClick={this.handleFeedsImport} title="Import Feeds">                
                    <i className="fas fa-file-upload fa-2x"></i>
                </button>
            );
        }

        return content;
    }

    render() {
        return(
            <React.Fragment>
                <input type="file" style={{display:'none'}} accept=".opml"
                        ref={el => this.fileImport = el} onChange={this.handleFile} />
                {this.renderButton()}
            </React.Fragment>
        );
    }
}