import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class ViewLink extends Component {

    showViewLinkModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: 'External Link',
            html: this.getViewLinkModalContent(),
            showCancelButton: false,
            allowOutsideClick: false,
            allowEnterKey: false,
            showConfirmButton: true,
            confirmButtonText: "Close",
            showCloseButton: true,
            width: '90%',
            customClass: 'swalPopup'
        })
        .then((value) => {
            
        });
    }

    getViewLinkModalContent = () => {
        return (
            <iframe src={this.props.url} name="extLinkFrame"></iframe>
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