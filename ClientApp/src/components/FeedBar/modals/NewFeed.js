import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class NewFeed extends Component {

    showNewFeedModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: 'New Feed',
            html: this.getNewFeedModalContent(),
            showConfirmButton: true,
            confirmButtonText: "Save",
            showCancelButton: false,
            allowOutsideClick: false,
            allowEnterKey: false,            
            showCloseButton: true
        })
        .then(async (value) => {
            if (value.isConfirmed) {                
                let feedName = document.querySelector('#textFeedName').value;
                let textFeedUrl = document.querySelector('#textFeedUrl').value;

                let feedLink = {
                    name: feedName,
                    addurl: encodeURIComponent(textFeedUrl)
                };

                //send entered values to service
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

    getMultiFeedLinkCallback = (feedLink) => {
        this.getFeedData(feedLink);
    }

    getFeedLinkData = async (feedLink) => {
        let request = new Request('api/rssmedia/GetFeedLinks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(feedLink)
        });

        await fetch(request)
        .then((response) => response.json())
        .then((data) => {                    
            //pass data back to FeedLinkAdd
            this.feedLinkAddCallback(data);
        }); 
    }

    feedLinkAddCallback = (feedLinks) => {
        this.props.feedLinkAddCallback(feedLinks);
    }    

    render() {
        let content = this.showNewFeedModal();

        return(
            <div>
                {content}
            </div>
        );
    }
}