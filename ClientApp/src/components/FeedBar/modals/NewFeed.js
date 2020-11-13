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
        });
    }

    getNewFeedModalContent = () => {
        return (
            <div className="addButtonModal">
                <div>
                    <input placeholder="Name..." type="text" ref={el => this.feedName = el} />
                </div>
                <div>
                    <input placeholder="Url..." type="text" ref={el => this.feedUrl = el} />
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