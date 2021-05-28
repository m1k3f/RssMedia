import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import FeedContext from '../../context/FeedContext';
import styles from './FeedArticleModals.module.css';

export class EditFeed extends Component {
    
    static contextType = FeedContext;

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
                const {feedLinksSettings} = this.context;
                let feedLinkId = this.props.feed.feedLinkId;

                let linkIndex = feedLinksSettings.feedLinks.findIndex((link) => 
                            link.id === feedLinkId);
                let updatedFeedLink = null;
                if (linkIndex > -1) {
                    feedLinksSettings.feedLinks[linkIndex].name = this.feedLinkName.value;
                    feedLinksSettings.feedLinks[linkIndex].title = this.feedTitle.value;
                    updatedFeedLink = {...feedLinksSettings.feedLinks[linkIndex]};
                }

                this.props.editFeedCallback(updatedFeedLink);
            }
            else {
                this.props.editFeedCallback(null); 
            }                       
        });
    }

    getEditFeedModalContent = () => {        
        let feedName = this.props.feed.feedName;
        let feedTitle = this.props.feed.feedTitle;
        let feedUrl = decodeURIComponent(this.props.feed.feedRssUrl);
        let feedUrlDisplay = (feedUrl.length > 50) ? `${feedUrl.substring(0, 50)}...` : feedUrl;

        return (
            <div className={styles.addEditButtonModal}>
                <p className={styles.addEditText}>
                    Feed Button Name
                </p>
                <input className={styles.addEditButtonModalItem} 
                        placeholder="" 
                        type="text" 
                        defaultValue={feedName} 
                        ref={el => this.feedLinkName = el} />
                <p className={styles.addEditText}>
                    Feed Title
                </p>
                <input className={styles.addEditButtonModalItem} 
                        placeholder="" 
                        type="text"
                        defaultValue={feedTitle}
                        ref={el => this.feedTitle = el} />
                <p className={styles.addEditText}>
                    Feed URL
                </p>
                <a className={styles.addEditButtonModalItem} href={feedUrl}>
                    {feedUrlDisplay}
                </a>
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