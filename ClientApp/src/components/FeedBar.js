import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

export class FeedBar extends Component {

    handleAddButton = (e) => {
        swal({
            content: this.getModalContent(),
            buttons: {
                confirm: {
                    text: 'Save',
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
        .then((values) => {
            //send entered values to service
        });
    }

    getModalContent = () => {
        return (
            <div>
                <h1>Popup Modal!</h1>
                <p>This is a popup modal for adding a feed.</p>
            </div>
        );
    }

    handleAllFeedsButton = (e) => {
        this.clearActiveFeed();        
        e.target.classList.add('divFeedsActive');
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
        this.clearActiveFeed();
        e.target.classList.add('divFeedsActive');
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
                </div>
            </div>
        );
    }
}

//export default FeedBar;