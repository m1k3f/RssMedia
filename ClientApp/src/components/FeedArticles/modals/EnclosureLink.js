import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class EnclosureLink extends Component {

    showEnclosureLinkModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: '',
            html: this.getEnclosureModalContent(),
            allowOutsideClick: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: false,
            // cancelButtonText: "Close",
            showCloseButton: true,
            focusCancel: true
        })
        .then((value) => {
            if (value.isDismissed) {
                this.audioElement.src = '';
            }
        });
    }

    getEnclosureModalContent = () => {
        let {article} = this.props;

        return (
            <div class="divEnclosure">
                <p>{article.articleTitle}</p>
                <audio controls 
                        src={article.articleEnclosureUrl}
                        ref={el => this.audioElement = el} />
                <a href={article.articleEnclosureUrl}>
                    Download
                </a>
            </div>
        );
    }

    render() {
        
        return(
            <div>
                {this.showEnclosureLinkModal()}
            </div>
        );
    }
}