import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class ViewLink extends Component {

    state = {
        article: this.props.article
    }

    showViewLinkModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: 'External Link',
            html: this.getViewLinkModalContent(),
            showCancelButton: false,
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
            <iframe src={this.state.article.articleUrl} 
                    name="extLinkFrame"
                    ref={el => this.frameElement = el}>
            </iframe>
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