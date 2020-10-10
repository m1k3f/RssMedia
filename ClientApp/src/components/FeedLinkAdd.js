import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

export class FeedLinkAdd extends Component {
    constructor(props) {
        super(props);
    }

    handleAddButton = (e) => {
        swal({
            content: this.getNewFeedModalContent(),
            buttons: {
                confirm: {
                    text: 'Add',
                    value: true,
                    visible: true
                },
                cancel: {
                    text: 'Cancel',
                    value: null,
                    visible: true
                }
            }
        })
        .then(async (value) => {
            if (value) {
                //send entered values to service
                let feedName = document.querySelector('#textFeedName').value;
                let textFeedUrl = document.querySelector('#textFeedUrl').value;

                let feedLink = {
                    name: feedName,
                    baseurl: encodeURIComponent(textFeedUrl)
                };

                this.getFeedLinkData(feedLink);
            }
        });
    }

    getNewFeedModalContent = () => {
        return (
            <div className="addButtonModal">
                <h3>New Feed</h3>
                <div>
                    <label>Name: </label>
                    <input id="textFeedName" type="text" />
                </div>
                <div>
                    <label>Url: </label>
                    <input id="textFeedUrl" type="text" />
                </div>
            </div>
        );
    }

    getFeedLinkData = async (feedLink) => {
        let request = new Request('api/rssmedia/feedlinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feedLink)
        });

        await fetch(request)
        .then((response) => response.json())
        .then((data) => {                    
            if (data.length === 0) {
                //do nothing, or show feedlink with warning icon
            }
            else if (data.length === 1) {
                // call api/rssmedia/feed
                this.getFeedData(data);
            }
            else if (data.length > 1) {
                //allow user to select the feed url
                this.showMultiFeedModal(data);
                // call api/rssmedia/feed
            }
        }); 
    }

    showMultiFeedModal = (feedLinks) => {
        swal({
            content: this.getMultiFeedModalContent(feedLinks),
            buttons: {
                confirm: {
                    text: 'Add',
                    value: true,
                    visible: true
                },
                cancel: {
                    text: 'Cancel',
                    value: null,
                    visible: true
                }
            }
        }).then((value) => {
            if (value) {
                //get feed link from value
                let selectedLinkId = document.querySelector('input[name="rbFeedLink"]:checked').value;
                let link = feedLinks.find(link => link.id === selectedLinkId);

                //get feed data for link
                this.getFeedData(link, 0, 20);
            }
        });
    }

    getMultiFeedModalContent = (feedLinks) => {
        let count = 0;
        let content = feedLinks.map((link) => {
            count++;
            let feedLinkId = `feedLink${count}`;
            return (
                <div key={link.id}>
                    <input type="radio" id={feedLinkId} name="rbFeedLink" value={link.id} />
                    <label htmlFor={feedLinkId}>{link.title}</label>
                </div>
            );
        });

        return (
            <div className="multiFeedModal">
                <p>Multiple feeds exist. Please select the desired feed: </p>
                {content}
            </div>
        );
    }

    getFeedData = (feedLink, articleOffset, articleCount) => {
        let feed = {
            feedname: feedLink.name,
            feedrssurl: feedLink.url
        };

        let feeds = {
            feedlist: [feed],
            feedarticleoffset: articleOffset,
            feedarticlecount: articleCount
        };      

        let request = new Request('api/rssmedia/feed', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feeds)
        });

        //send request to service
    }

    render() {
        return(
            <div className="divAdd">
                {/* 
                Add button
                Popup modal 
                */}
                <a onClick={this.handleAddButton}>
                    <i className="fas fa-plus fa-lg"></i>
                </a>                    
            </div>
        );
    }
}