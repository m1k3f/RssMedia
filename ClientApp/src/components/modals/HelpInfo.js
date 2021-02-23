import React, { Component } from 'react';

import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

import styles from './Modals.module.css';

export class HelpInfo extends Component {

    ReactSwal = withReactContent(swal);

    showHelpModal = () => {
        this.ReactSwal.fire({
            title: 'Help',
            html: this.getHelpModalContent(),
            allowOutsideClick: true,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: true,
            width: '60%',
        })
        .then((value) => {
            this.props.helpInfoCallback();
        });
    }

    getHelpModalContent = () => {
        return (
            <div className={styles.helpModal}>
                <p className={styles.helpModalText} style={{fontWeight:'600'}}>Top Navigation Bar</p>                
                <p className={styles.helpModalText}>
                    <i className="fas fa-file-upload fa-lg"></i>&nbsp; imports a new list of feeds 
                    from a .opml file.
                </p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-file-download fa-lg"></i>&nbsp; exports your feeds to a .opml file.
                </p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-trash fa-lg"></i>&nbsp; deletes all feeds.
                </p>
                <p className={styles.helpModalText}>
                    All feeds are saved in web browser storage, but it is wise to back up your feeds to
                    a file just in case!
                </p>
                <p className={styles.helpModalText}>&nbsp;</p>
                <p className={styles.helpModalText} style={{fontWeight:'600'}}>Main Feed Bar</p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-plus fa-lg" style={{color: '#29a3a3'}}></i>&nbsp; adds a new feed
                    when given a name and URL for the feed. The URL can be a 
                    direct link to an RSS feed or a web page that has RSS feeds associated (e.g. npr.org, nytimes.com, etc). 
                    If multiple RSS feeds are found, then choose the desired feed.
                </p>
                <p className={styles.helpModalText}>&nbsp;</p>
                <p className={styles.helpModalText} style={{fontWeight:'600'}}>Feed Articles</p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-sync-alt fa-lg"></i>&nbsp; refreshes the list of articles.
                </p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-edit fa-lg"></i>&nbsp; edits feed details.
                </p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-trash fa-lg"></i>&nbsp; deletes the feed.
                </p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-link fa-lg"></i>&nbsp; displays the original full article 
                    in a popup window.
                </p>
                <p className={styles.helpModalText}>
                    <i className="fas fa-paperclip fa-lg"></i>&nbsp; displays a popup window for playing  
                    attached audio (e.g. podcasts).
                </p>
            </div>
        );
    }

    render() {
        return(
            <React.Fragment>
                {this.showHelpModal()}
            </React.Fragment>
        );
    }
}