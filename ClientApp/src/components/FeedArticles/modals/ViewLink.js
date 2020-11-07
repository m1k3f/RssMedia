import React, { Component } from 'react';
import swal from '@sweetalert/with-react';

export class ViewLink extends Component {

    showViewLinkModal = () => {
        swal({
            content: this.getViewLinkModalContent(),
            buttons: {
                confirm: {
                    text: 'Close',
                    value: true,
                    visible: true
                }
            }
        })
        .then((value) => {
            
        });
    }

    getViewLinkModalContent = () => {
        return (
            <iframe src={this.props.url} name="articleFrame"></iframe>
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