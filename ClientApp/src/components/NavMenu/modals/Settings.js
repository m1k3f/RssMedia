import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FeedExportButton } from '../controls/FeedExportButton';
import { FeedImportButton } from '../controls/FeedImportButton';
import { DeleteFeedsButton } from '../controls/DeleteFeedsButton';
import { MaxArticlesOptions } from '../controls/MaxArticlesOptions';

export class Settings extends Component  {
    constructor() {
        super();
        this.Settings = null;
        this.IsChanged = false;
    }

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
            if (this.IsChanged) {
                this.props.navMenuCallback(this.Settings);
            }
            else {
                this.props.navMenuCallback(null);
            }
        });
    }

    getSettingsModalContent = () => {
        let defaultMaxArticlesOption = (this.Settings === null) ? 
                                        this.props.defaultSettings.maxArticles : 
                                        this.Settings.maxArticles;

        return(
            <div className="settingsModal">
                <div>
                    <MaxArticlesOptions 
                        defaultOption = {defaultMaxArticlesOption}
                        settingsCallback = {this.handleMaxArticlesCallback}  />
                </div>                
                <div>
                    <p>Feeds:</p>
                    <FeedImportButton />                
                    <FeedExportButton />
                    <DeleteFeedsButton />
                </div>                
            </div>
        );
    }

    handleMaxArticlesCallback = (maxArticlesObject) => {
        let propertyName = Object.keys(maxArticlesObject)[0];
        let propertyValue = Object.values(maxArticlesObject)[0];
        let settings = {};
        settings[propertyName] = propertyValue;

        this.Settings = settings;
        this.IsChanged = true;
    }

    render() {
        return(
            <React.Fragment>
                {this.showSettingsModal()}
            </React.Fragment>
        );
    }
}