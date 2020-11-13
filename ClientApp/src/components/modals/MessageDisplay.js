import React, { Component } from 'react';
import swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content'

export class MessageDisplay extends Component {

    showMessageModal = () => {
        const ReactSwal = withReactContent(swal);

        ReactSwal.fire({
            title: (this.props.isError) ? 'Error' : '',
            icon: (this.props.isError) ? 'error' : '',
            html: this.getMessageModalContent(),
            showConfirmButton: true,
            confirmButtonText: "OK",
            showCancelButton: false,
            focusConfirm: true,
            allowOutsideClick: false,
            allowEnterKey: false,            
            showCloseButton: true
        })
    }

    getMessageModalContent = () => {
        return (
            <p className="messageModal">
                {this.props.children}
            </p>
        );
    }

    render() {
        return(
            <React.Fragment>
                {this.showMessageModal()}
            </React.Fragment>
        );
    }
}