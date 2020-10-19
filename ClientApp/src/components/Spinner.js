import React, { Component } from 'react';

export class Spinner extends Component {

    render() {
        return(
            <div className="divSpinner" hidden={this.props.hide}>
                <i className="fas fa-spinner fa-spin fa-lg"></i>
            </div>
        );
    }
}