import React, { Component } from 'react';

import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

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
            showCloseButton: true
        })
        .then((value) => {
            if (value.isDismissed) {
                                    
            }
        });
    }

    getHelpModalContent = () => {
        return (
            <div className="helpModal">
                <p style={{fontWeight:'600'}}>Top Navigation Bar</p>                
                <p>
                    To import a new list of feeds, click the&nbsp;<i className="fas fa-file-upload fa-lg"></i>&nbsp; 
                    button. Imports require a .opml file, which can be exported from many other RSS readers.
                </p>
                <p>
                    To export your feeds to a file, click the&nbsp;<i className="fas fa-file-download fa-lg"></i>&nbsp; 
                    button. This file will be a .opml file, which can be imported into many other RSS readers.
                </p>
                <p>
                    To delete all saved feeds, click the&nbsp;<i className="fas fa-trash fa-lg"></i>&nbsp;button.
                </p>
                <p>
                    All feeds are saved in web browser storage, but it is wise to back up your feeds to
                    a file just in case!
                </p>
                <p style={{fontWeight:'600'}}>Main Feed Bar</p>
                <p>
                    To add a new feed, click the&nbsp;<i className="fas fa-plus fa-lg" style={{color: '#29a3a3'}}></i>&nbsp;
                    button. You will need to provide a name and URL for the feed. The URL can either be a 
                    direct link to an RSS feed or to a web page that has RSS feeds associated. If multiple RSS
                    feeds are found, then choose your desired feed.
                </p>
                <p style={{fontWeight:'600'}}>Feed Articles</p>
                <p>
                    When viewing articles in a feed,&nbsp;<i className="fas fa-sync-alt fa-lg"></i> refreshes 
                    the articles,&nbsp;<i className="fas fa-edit fa-lg"></i> edits feed details, and&nbsp;
                    <i className="fas fa-trash fa-lg"></i> deletes the feed. 
                </p>
                <p>
                    When viewing an individual article,&nbsp;<i className="fas fa-link fa-lg"></i>&nbsp;displays
                    the full article in a popup window. When available,&nbsp;<i className="fas fa-paperclip fa-lg"></i>&nbsp;
                    displays a popup window to listen to attached audio (e.g. podcasts);
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