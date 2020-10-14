import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

export class MultiFeedSelection extends Component {
    constructor(props) {
        super(props);

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
                //this.getFeedData(link, 0, 20);
                this.selectedFeedCallback(link);
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

    selectedFeedCallback = (feedLink) => {
        this.props.feedLinkAddCallback(feedLink);
    }

    render() {
        let content = this.showMultiFeedModal(this.props.linkData);

        return(
            <div>
                {content}
            </div>
        );
    }
}