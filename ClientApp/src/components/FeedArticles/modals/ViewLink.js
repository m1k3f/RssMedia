import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class ViewLink extends Component {

    showViewLinkModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: '',
            html: this.getViewLinkModalContent(),
            allowOutsideClick: false,
            allowEnterKey: false,
            showConfirmButton: false,
            showCancelButton: true,
            cancelButtonText: "Close",
            showCloseButton: true,
            focusCancel: true,
            width: '90%',
            customClass: 'swalPopup'
        })
        .then((value) => {
            if (value.isDismissed) {
                this.frameElement.src = '';
            }
        });
    }

    getViewLinkModalContent = () => {
        let frameUrl = this.getFrameUrl();

        return (
            <div className="divViewLink">
                <a href={this.props.article.articleUrl} target="_blank" rel="noopener noreferrer">
                    <p className="truncate">{this.props.article.articleUrl}</p>
                </a>
                <iframe title="View Link Modal"
                        src={frameUrl} 
                        name="extLinkFrame"
                        ref={el => this.frameElement = el}>
                </iframe>
            </div>
        );
    }

    getFrameUrl = () => {
        let articleUrl = this.props.article.articleUrl;
        let frameUrl = '';
        if (articleUrl.includes("youtube.com")) {
            let urlArray = articleUrl.split('/');
            let protocol = urlArray[0];
            let host = urlArray[2];
            let page = (urlArray.length > 3) ? urlArray[3] : '';
            frameUrl = `${protocol}//${host}/${page.replace("watch", "embed")}`;
        }
        else {
            frameUrl = articleUrl;
        }

        return frameUrl;
    }

    render() {
        let content = this.showViewLinkModal();

        return(
            <div>
                {content}
            </div>
        );
    }
}