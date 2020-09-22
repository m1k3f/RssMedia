import React, { Component } from 'react';

export class FeedBar extends Component {

    handleAddButton() {

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
        let allFeedsButton = document.querySelector('.divAllFeeds');
        allFeedsButton.classList.remove('divFeedsActive');
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
                    <a onClick={this.handleAllFeedsButton}>
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