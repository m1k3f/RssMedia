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
                    feedLinkId: this.props.feed.feedLinkId,
                    name: this.feedLinkName.value,
                    url: this.props.feed.feedRssUrl
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
        let feedUrlDisplay = (feedUrl.length > 50) ? `${feedUrl.substring(0, 50)}...` : feedUrl;

        return (
            <div className="addEditButtonModal">                
                <input placeholder="Name..." type="text" 
                        defaultValue={feedName} ref={el => this.feedLinkName = el} />
                <a href={feedUrl}>{feedUrlDisplay}</a>
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