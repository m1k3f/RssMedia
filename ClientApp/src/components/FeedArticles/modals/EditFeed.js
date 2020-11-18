import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class EditFeed extends Component {
    
    showEditFeedModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: 'Edit Feed',
            html: this.getEditFeedModalContent(),
            showConfirmButton: true,
            confirmButtonText: "Save",
            showCancelButton: true,
            focusCancel: true,
            allowOutsideClick: false,
            allowEnterKey: false,            
            showCloseButton: true
        })
        .then((value) => {
            if (value.isConfirmed) {
                // Save data to local storage
                let feedLink = {

                }
                
                this.props.editFeedCallback(feedLink);
            }
            else {
                this.props.editFeedCallback(null);
            }            
        });
    }

    getEditFeedModalContent = () => {
        let feedName = this.props.feed.feedName;
        let feedUrl = decodeURIComponent(this.props.feed.feedRssUrl);

        return (
            <div className="addEditButtonModal">                
                <input placeholder="Name..." type="text" defaultValue={feedName} />
                <input placeholder="URL..." type="text" defaultValue={feedUrl} />
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