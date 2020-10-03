import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

export class FeedBar extends Component {

    handleAddButton = (e) => {
        swal({
            content: this.getModalContent(),
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
                let feedTitle = document.querySelector('#textFeedTitle').value;
                let feedUrl = document.querySelector('#textFeedUrl').value;

                let feedSearchCriteria = {
                    'title': feedTitle,
                    'url': encodeURIComponent(feedUrl)
                };

                await fetch('rssmedia', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8'
                    },
                    body: JSON.stringify(feedSearchCriteria)
                }).then((response) => {
                    //response contains feed object
                    // use feed object to populate new feed button
                });                
            }
        });
    }

    getModalContent = () => {
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

    handleAllFeedsButton = (e) => {
        //get all feed articles from service

        this.clearActiveFeed();        
        e.target.classList.add('divFeedsActive');
        document.querySelector('.divFeedArticles').hidden = false;
    }

    getFeedList() {
        let feedList = null;
        if (window.localStorage) {
            feedList = localStorage.getItem("rmFeeds");
            if (feedList === undefined || feedList === null || feedList === '') {        
                feedList = {
                    "feedList": []
                };
            }
        }
        return feedList;
    }

    renderFeedButtons() {
        let feedList = this.getFeedList();        
        
    }

    handleFeedButton = (e) => {
        //get feed articles from service

        this.clearActiveFeed();
        e.target.classList.add('divFeedsActive');
        document.querySelector('.divFeedArticles').hidden = false;
    }

    clearActiveFeed = () => {
        let feedButtons = document.querySelectorAll('a[name="btnFeeds"');
        feedButtons.forEach(f => f.classList.remove('divFeedsActive'));
    }

    render() {
        return (
            <div className="divFeedBar">
                <div className="divAdd">
                    {/* 
                    Add button
                    Popup modal 
                    */}
                    <a onClick={this.handleAddButton}>
                        <i className="fas fa-plus fa-lg"></i>
                    </a>                    
                </div>
                <div className="divAllFeeds">
                    <a name="btnFeeds" onClick={this.handleAllFeedsButton}>
                        All Feeds
                    </a>
                </div>
                <div className="divFeeds">
                    {/* show list of saved feeds */}                    
                    <a name="btnFeeds" onClick={this.handleFeedButton}>
                        Test Feed Button 1
                    </a>
                    <a name="btnFeeds" onClick={this.handleFeedButton}>
                        Test Feed Button 2
                    </a>
                    <a name="btnFeeds" onClick={this.handleFeedButton}>
                        Test Feed Button 3
                    </a>
                    <a name="btnFeeds" onClick={this.handleFeedButton}>
                        Test Feed Button 4
                    </a>
                </div>
            </div>
        );
    }
}

//export default FeedBar;