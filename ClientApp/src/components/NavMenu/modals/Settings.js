import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import FeedContext from '../../context/FeedContext';
import { FeedExportButton } from '../controls/FeedExportButton';
import { FeedImportButton } from '../controls/FeedImportButton';
import { DeleteFeedsButton } from '../controls/DeleteFeedsButton';
import { MaxArticlesOptions } from '../controls/MaxArticlesOptions';

export class Settings extends Component  {
    constructor() {
        super();
        this.SettingsObject = null;
        this.IsChanged = false;
    }

    static contextType = FeedContext;

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
                this.props.navMenuCallback(this.SettingsObject);
            }
            else {
                this.props.navMenuCallback(null);
            }
        });
    }

    getSettingsModalContent = () => {
        let defaultMaxArticlesOption = (this.SettingsObject === null) ? 
                                        this.props.defaultSettings.maxArticles : 
                                        this.SettingsObject.settings.maxArticles;

        return(
            <div className="settingsModal">
                <div>
                    <MaxArticlesOptions 
                        defaultOption = {defaultMaxArticlesOption}
                        settingsCallback = {this.handleMaxArticlesCallback}  />
                </div>                
                <div>
                    <p>Feeds:</p>
                    <FeedImportButton settingsCallback = {this.handleFeedButtonCallback} />                
                    <FeedExportButton settingsCallback = {this.handleFeedButtonCallback} />
                    <DeleteFeedsButton settingsCallback = {this.handleFeedButtonCallback} />
                </div>                
            </div>
        );
    }

    handleMaxArticlesCallback = (maxArticlesObject) => {
        let propertyName = Object.keys(maxArticlesObject)[0];
        let propertyValue = Object.values(maxArticlesObject)[0];
        let settings = {};
        settings[propertyName] = propertyValue;

        this.SettingsObject.settings = settings;
        this.IsChanged = true;
    }

    handleFeedButtonCallback = (action) => {
        const { feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
        if (action === 'feedsDelete') {
            feedLinksSettings.feedLinks.length = 0;
            saveAndRefreshFeedLinks(feedLinksSettings);
        }
    }

    render() {
        return(
            <React.Fragment>
                {this.showSettingsModal()}
            </React.Fragment>
        );
    }
}