import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FeedExportButton } from '../controls/FeedExportButton';
import { FeedImportButton } from '../controls/FeedImportButton';

export class Settings extends Component  {
    showSettingsModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: 'Settings',
            html: this.getSettingsModalContent(),
            showConfirmButton: false,
            //confirmButtonText: "Save",
            showCancelButton: false,
            //focusCancel: true,
            allowOutsideClick: false,
            allowEnterKey: false,            
            showCloseButton: true
        })
        .then((value) => {
            // if (value.isConfirmed) {

            // }
        });
    }

    getSettingsModalContent = () => {
        return(
            <div className="settingsModal">
                <div>
                    <p>Feed File Backup:</p>
                    <FeedImportButton />                
                    <FeedExportButton />
                </div>
                <div>
                    <button onClick="">Delete All Feeds</button>
                </div>
                <div>
                    <p>Max articles:</p>
                    <input type="text" />
                </div>
            </div>
        );
    }       

    render() {
        return(
            <React.Fragment>
                {this.showSettingsModal()}
            </React.Fragment>
        );
    }
}