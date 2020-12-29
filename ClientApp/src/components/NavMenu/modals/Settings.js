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
        this.ReactSwal = withReactContent(swal);
        this.SettingsObject = null;
        this.IsSettingsChanged = false;
        this.IsFeedsDelete = false;
    }

    static contextType = FeedContext;

    showSettingsModal = () => {
        this.ReactSwal.fire({
            title: 'Settings',
            html: this.getSettingsModalContent(),
            showConfirmButton: false,
            showCancelButton: false,
            allowOutsideClick: true,
            allowEnterKey: false,            
            showCloseButton: true
        })
        .then((value) => {
            if (this.IsSettingsChanged) {
                this.props.navMenuCallback(this.SettingsObject);
            }
            else {
                this.props.navMenuCallback(null);
            }

            if (this.IsFeedsDelete) {
                const { feedLinksSettings, saveAndRefreshFeedLinks } = this.context;
                feedLinksSettings.feedLinks.length = 0;
                saveAndRefreshFeedLinks(feedLinksSettings);
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
        this.IsSettingsChanged = true;
    }

    handleFeedButtonCallback = (action) => {        
        if (action === 'feedsDelete') {
            this.IsFeedsDelete = true;
            this.ReactSwal.close();
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