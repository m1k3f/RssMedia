import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FeedExportButton } from '../controls/FeedExportButton';
import { FeedImportButton } from '../controls/FeedImportButton';
import { DeleteFeedsButton } from '../controls/DeleteFeedsButton';
import { MaxArticlesOptions } from '../controls/MaxArticlesOptions';

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
            allowOutsideClick: true,
            allowEnterKey: false,            
            showCloseButton: true
        })
        .then((value) => {
            //Save all settings
        });
    }

    getSettingsModalContent = () => {
        return(
            <div className="settingsModal">
                <div>
                    <MaxArticlesOptions />
                </div>
                <div>
                    <FeedImportButton />                
                    <FeedExportButton />
                    <DeleteFeedsButton />
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