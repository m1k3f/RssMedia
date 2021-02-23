import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import styles from './FeedBarModal.module.css';

export class MultiFeedSelection extends Component {
    
    showMultiFeedModal = (feedLinks) => {
        const ReactSwal = withReactContent(swal);
        ReactSwal.fire({
            title: 'Multiple Feeds',
            html: this.getMultiFeedModalContent(feedLinks),
            showConfirmButton: true,
            confirmButtonText: 'Add',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            allowOutsideClick: false,
            allowEnterKey: false
        }).then((value) => {
            if (value.isConfirmed) {
                //get feed link from value
                let selectedLinkId = document.querySelector('input[name="rbFeedLink"]:checked').value;
                let link = feedLinks.find(link => link.id === selectedLinkId);

                this.selectedFeedCallback(link);
            }
            else {
                this.selectedFeedCallback(null);
            }
        });
    }

    getMultiFeedModalContent = (feedLinks) => {
        let count = 0;
        let content = feedLinks.map((link) => {
            count++;
            let feedLinkId = `feedLink${count}`;
            return (
                <div key={link.id} className={styles.multiFeedModalOption}>
                    <input type="radio" id={feedLinkId} name="rbFeedLink" value={link.id} />
                    <label className={styles.optionLabel} htmlFor={feedLinkId}>
                        <p className={styles.optionLabelText}>{link.title}</p>
                        <p className={`${styles.optionLabelText} ${styles.optionLabelUrl}`}>
                            {decodeURIComponent(link.url)}
                        </p>
                    </label>
                </div>
            );
        });

        return (
            <div className={styles.multiFeedModal}>
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