import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

export class EditFeed extends Component {
    
    showEditFeedModal = () => {
        swal({
            content: this.getEditFeedModalContent(),
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
        .then((value) => {

        });
    }

    getEditFeedModalContent = () => {
        let feedName = this.props.feed.feedName;
        let feedUrl = decodeURIComponent(this.props.feed.feedRssUrl);

        return (
            <div className="editButtonModal">
                <h3>Edit Feed</h3>
                <div>
                    <label>Name: </label>
                    <input id="textFeedName" type="text" value={feedName} />
                </div>
                <div>
                    <label>Url: </label>
                    <input id="textFeedUrl" type="text" value={feedUrl} />
                </div>
            </div>
        );
    }

    render() {
        let content = this.showEditFeedModal();

        return(
            <React.Fragment>
                {content}
            </React.Fragment>
        );
    }
}