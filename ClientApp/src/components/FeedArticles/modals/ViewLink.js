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
        
        return (
            <div className="divViewLink">
                <a href={this.props.article.articleUrl} target="_blank" rel="noopener noreferrer">
                    <p className="truncate">{this.props.article.articleUrl}</p>
                </a>
                <iframe title="View Link Modal"
                        src={this.props.article.articleUrl} 
                        name="extLinkFrame"
                        ref={el => this.frameElement = el}>
                </iframe>
            </div>
        );
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