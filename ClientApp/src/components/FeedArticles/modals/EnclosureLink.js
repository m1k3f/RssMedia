import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class EnclosureLink extends Component {

    state = {
        article: null
    }

    async componentDidMount() {
        let {article} = this.props;
        let resolvedEnclosureUrl = await this.getResolvedUrl(article.articleEnclosureUrl);
        article.articleEnclosureUrl = resolvedEnclosureUrl;

        this.setState({
            article: article
        });
    }

    showEnclosureLinkModal = () => {
        if (this.state.article !== null) {
            const ReactSwal = withReactContent(swal);

            ReactSwal.fire({
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
            });
        }
    }

    getEnclosureModalContent = () => {
        return (
            <div className="divEnclosure">
                <p>{this.state.article.articleTitle}</p>
                <audio controls 
                        src={this.state.article.articleEnclosureUrl}
                        ref={el => this.audioElement = el} />
                <a href={this.state.article.articleEnclosureUrl}>
                    Download
                </a>
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

        let responseJson = await fetch(request).then((response) => 
            response.json()
        );

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