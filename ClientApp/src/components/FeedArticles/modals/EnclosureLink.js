import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

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
        return (
            <div className="divEnclosure">
                <p>{this.props.article.articleTitle}</p>
                <audio controls 
                        onPlay={this.handlePlayButton}
                        ref={el => this.audioElement = el} />
                <button onClick={this.handleDownloadButton}>
                    <i className="fas fa-download fa-lg"></i>&nbsp;Download
                </button>
            </div>
        );
        
    }

    getResolvedUrl = async (enclosureUrl) => {        

        //TODO: use fetch instead of api?
        let encodedUrl = encodeURIComponent(enclosureUrl);
        let urlObject = {
            originalUrl: encodedUrl
        };

        // let request = new Request('api/rssmedia/resolvedurl', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json;charset=utf-8'
        //     },                    
        //     body: JSON.stringify(urlObject)
        // });

        let request = new Request(`api/rssmedia/resolvedurl/${encodedUrl}`);

        let responseJson = await fetch(request).then((response) => 
            response.json()
        );

        return responseJson.resolvedUrl;
    }

    handlePlayButton = async (e) => {
        //TODO: use fetch instead of api?
        const audioElement = e.target;
        if (!audioElement.paused && audioElement.currentTime === 0)
        {
            let {article} = this.props;
            let resolvedEnclosureUrl = await this.getResolvedUrl(article.articleEnclosureUrl);
            audioElement.src = resolvedEnclosureUrl;
            //audioElement.play();
        }
    }

    handleDownloadButton = async (e) => {
        let {article} = this.props;
        
        fetch(article.articleEnclosureUrl).then(response => {
            response.blob().then(blob => {
                let downloadLink = document.createElement('a');
                let url = window.URL.createObjectURL(blob);
                downloadLink.href = url;
                downloadLink.download = 'download';        
                downloadLink.click();
            });
        });        
    }

    render() {        
        return(
            <div>
                {this.showEnclosureLinkModal()}
            </div>
        );
    }
}