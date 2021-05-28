import React, { Component } from 'react';

import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import styles from './FeedBarModal.module.css';

export class NewFeed extends Component {

    showNewFeedModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: 'New Feed',
            html: this.getNewFeedModalContent(),
            showConfirmButton: true,
            confirmButtonText: "Save",
            showCancelButton: true,
            focusCancel: true,
            allowOutsideClick: false,
            allowEnterKey: false,            
            showCloseButton: true
        })
        .then(async (value) => {
            if (value.isConfirmed) {
                let feedLink = {
                    name: this.feedName.value,
                    addurl: encodeURIComponent(this.feedUrl.value)
                };
                
                //send entered values to service
                this.getFeedLinkData(feedLink);
            }
            else {
                this.feedLinkAddCallback(null);
            }
        });
    }

    getNewFeedModalContent = () => {
        return (
            <div className={styles.addEditButtonModal}>                
                <p className={styles.addEditText}>
                    Feed Name
                </p>
                <input className={styles.addEditButtonModalInput} placeholder="" 
                        type="text" ref={el => this.feedName = el} />

                <p className={styles.addEditText}>
                    Link to an RSS feed or a webpage with associated RSS feeds
                </p>
                <input className={styles.addEditButtonModalInput} placeholder="" 
                        type="text" ref={el => this.feedUrl = el} />
            </div>
        );
    }

    getMultiFeedLinkCallback = (feedLink) => {
        this.getFeedData(feedLink);
    }

    getFeedLinkData = async (feedLink) => {
        let request = new Request(process.env.REACT_APP_APIFEEDLINKS, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feedLink)
        });

        await fetch(request)
        .then((response) => {
            if (response.status === 200) {
                return response.json()
            }
        })
        .then((data) => {       
            //pass data back to FeedLinkAdd
            this.feedLinkAddCallback(data);            
        }); 
    }

    feedLinkAddCallback = (feedLinks) => {
        this.props.feedLinkAddCallback(feedLinks);
    }    

    render() {
        return(
            <React.Fragment>
                {this.showNewFeedModal()}
            </React.Fragment>
        );
    }
}