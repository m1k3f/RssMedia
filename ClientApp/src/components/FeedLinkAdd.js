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
                //let feedTitle = document.querySelector('#textFeedTitle').value;
                let textFeedUrl = document.querySelector('#textFeedUrl').value;
                let feedUrl = { url: encodeURIComponent(textFeedUrl) };

                await fetch('api/rssmedia/feedlinks', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },                    
                    body: JSON.stringify(feedUrl)
                }).then((response) => {
                    //if more than 1 URL, allow user to select the feed url
                    if (response.ok) {
                        let res = response;
                        // call rssmedia/feed
                    }
                }).then((response) => {
                    // response contains feed object
                    // use feed object to populate new feed button
                });                
            }
        });
    }

    getNewFeedModalContent = () => {
        return (
            <div className="addButtonModal">
                <h3>New Feed</h3>
                <div>
                    <label>Title: </label>
                    <input id="textFeedTitle" type="text" />
                </div>
                <div>
                    <label>Url: </label>
                    <input id="textFeedUrl" type="text" />
                </div>
            </div>
        );
    }

    getMultiFeedModalContent = (feedLinks) => {
        let content = feedLinks.map((link) => {
            return (<div>link.Title</div>);
        });

        return (
            <div className="">
                <p>Multiple feeds exist. Please select the desired feed: </p>
                {content}
            </div>
        );
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