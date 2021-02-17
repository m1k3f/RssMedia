import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

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
            paddingBottom: '6px',
            fontSize: '13px'
        };

        return (
            <div className={styles.divEnclosure}>
                <p style={itemStyle}>{this.props.article.articleTitle}</p>
                <audio controls 
                        onPlay={this.handlePlayButton}
                        ref={el => this.audioElement = el}
                        style={itemStyle} />
                {/* <button onClick={this.handleDownloadButton}>
                    <i className="fas fa-download fa-lg"></i>&nbsp;Download
                </button> */}
            </div>
        );
        
    }

    getResolvedUrl = async (enclosureUrl) => {        

        let encodedUrl = encodeURIComponent(enclosureUrl);
        let urlObject = {
            originalUrl: encodedUrl
        };

        let request = new Request('api/rssmedia/resolvedurl', {
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

    handlePlayButton = async (e) => {
        const audioElement = e.target;
        if (!audioElement.paused && audioElement.currentTime === 0)
        {
            let {article} = this.props;
            // let resolvedEnclosureUrl = await this.getResolvedUrl(article.articleEnclosureUrl);
            // audioElement.src = resolvedEnclosureUrl;
            audioElement.src = article.articleEnclosureUrl;
            //audioElement.play();
        }
    }

    // handleDownloadButton = async (e) => {
    //     let {article} = this.props;
        
    //     fetch(article.articleEnclosureUrl).then(response => {
    //         response.blob().then(blob => {
    //             let downloadLink = document.createElement('a');
    //             let url = window.URL.createObjectURL(blob);
    //             downloadLink.href = url;
    //             downloadLink.download = 'download';        
    //             downloadLink.click();
    //         });
    //     });        
    // }

    render() {        
        return(
            <div>
                {this.showEnclosureLinkModal()}
            </div>
        );
    }
}