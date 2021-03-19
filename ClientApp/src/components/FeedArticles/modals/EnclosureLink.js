import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'
import { FaSpinner } from 'react-icons/fa';

import styles from './FeedArticleModals.module.css';

export class EnclosureLink extends Component {

    constructor() {
        super();
        this.ReactSwal = withReactContent(swal);
    }

    state = {
        article: null
    }    

    showEnclosureLinkModal = () => {
        if (this.props.article !== null) {

            this.ReactSwal.fire({
                title: '',
                html: this.getEnclosureModalContent(),
                allowOutsideClick: false,
                allowEnterKey: false,
                showConfirmButton: false,
                showCancelButton: false,
                showCloseButton: true,
                focusCancel: true
            })
            .then((value) => {
                if (value.isDismissed) {
                    this.audioElement.src = '';                    
                }

                this.props.articleCallback();
            });
        }
    }

    getEnclosureModalContent = () => {
        let itemStyle = {
            marginBottom: '6px',
            fontSize: '13px'
        };

        let {article} = this.props;

        return (
            <div className={styles.divEnclosure}>
                <p style={itemStyle}>{this.props.article.articleTitle}</p>
                <div className={styles.enclosureAudio}>
                    <audio className={styles.audioElement} style={itemStyle} controls preload='none' 
                            ref={el => this.audioElement = el}
                            onPlay={this.onAudioPlay} 
                            onPlaying={this.onAudioPlaying} 
                            onPause={this.onAudioPaused}>
                                <source src={article.articleEnclosureUrl} />
                    </audio>
                    <div ref={el => this.audioSpinner = el} style={{visibility: 'hidden'}}>
                        <FaSpinner className="spin" />
                    </div>
                </div>
            </div>
        );        
    }

    onAudioPlay = () => {
        this.audioSpinner.style.visibility = 'visible';
    }

    onAudioPlaying = () => {
        this.audioSpinner.style.visibility = 'hidden';
    }

    onAudioPaused = () => {
        this.audioSpinner.style.visibility = 'hidden';
    }

    getResolvedUrl = async (enclosureUrl) => {
        let encodedUrl = encodeURIComponent(enclosureUrl);
        let urlObject = {
            originalUrl: encodedUrl
        };

        let request = new Request(process.env.REACT_APP_APIRESOLVEDURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(urlObject)
        });

        let responseJson = await fetch(request)
                                    .then((response) => response.json())
                                    .catch(error => console.log(error));

        return responseJson.resolvedUrl;
    }

    render() {        
        return(
            <div>
                {this.showEnclosureLinkModal()}
            </div>
        );
    }
}