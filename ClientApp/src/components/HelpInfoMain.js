import React, { Component } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';

import { HelpInfo } from './modals/HelpInfo';
import styles from './Content.module.css';

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
        let iconStyle = {
            width: '50px',
            height: '50px'
        };

        return (
            <div className={styles.divHelpInfoMain}>
                <div className={styles.divHelpInfoButton} onClick={this.handleButtonClick}>
                    <FaQuestionCircle style={iconStyle} />
                    <p className={styles.divHelpInfoButtonText}>Help</p>
                </div>
                {this.renderHelpModal()}
            </div>
        );
    }
}