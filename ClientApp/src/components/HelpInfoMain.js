import React, { Component } from 'react';

import { HelpInfo } from './modals/HelpInfo'

export class HelpInfoMain extends Component {

    state = {
        showHelpModal: false
    }

    handleButtonClick = () => {
        this.setState({
            showHelpModal: true
        })
    }

    handleHelpInfoCallback = () => {
        this.setState({
            showHelpModal: false
        });
    }

    renderHelpModal = () => {
        let content = null;
        if (this.state.showHelpModal) {
          content = (
            <HelpInfo helpInfoCallback={this.handleHelpInfoCallback} />
          );
        }
    
        return (content);
      }

    render() {
        return (
            <div className="divHelpInfoMain">
                <div className="divHelpInfoButton" onClick={this.handleButtonClick}>
                    <i className="fas fa-question-circle fa-2x"></i>
                    <p>Help</p>
                </div>
                {this.renderHelpModal()}
            </div>
        );
    }
}