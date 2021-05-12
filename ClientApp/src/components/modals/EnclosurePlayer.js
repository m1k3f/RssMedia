import React, { Component } from 'react';
import { FaSpinner, FaAngleDoubleDown } from 'react-icons/fa';

import FeedContext from '../context/FeedContext';
import styles from './Modals.module.css';

export class EnclosurePlayer extends Component {

    static contextType = FeedContext;

    handlePlayerHideClick = () => {
        const {setSelectedEnclosureArticle} = this.context;
        setSelectedEnclosureArticle(null);
    }

    onAudioPlay = () => {
        this.audioSpinner.style.visibility = 'visible';
    }

    onAudioPlaying = () => {
        this.audioSpinner.style.visibility = 'hidden';
    }

    onAudioPaused = () => {
        this.audioSpinner.style.visibility = 'hidden';
    }

    onAudioError = () => {
        this.audioSpinner.style.visibility = 'hidden';
    }

    renderPlayer = () => {
        let content = null;
        const {selectedEnclosureArticle} = this.context;
        if (selectedEnclosureArticle !== null) {
            content = (
                <div className={styles.divEnclosurePlayer}>
                    <div className={styles.enclosurePlayer} ref={el => this.enclosurePlayer = el}>
                        <FaAngleDoubleDown className={styles.hidePlayerIcon} 
                                            onClick={this.handlePlayerHideClick} />
                        <p className={styles.audioTitle}>{selectedEnclosureArticle.articleTitle}</p>
                        <div className={styles.enclosureAudio}>
                            <audio className={styles.audioElement} controls preload='none' 
                                    ref={el => this.audioElement = el}
                                    src={selectedEnclosureArticle.articleEnclosureUrl}
                                    onPlay={this.onAudioPlay} 
                                    onPlaying={this.onAudioPlaying} 
                                    onPause={this.onAudioPaused}
                                    onError={this.onAudioError}>
                            </audio>
                            <div ref={el => this.audioSpinner = el} style={{visibility: 'hidden'}}>
                                <FaSpinner className="spin" />
                            </div>                        
                        </div>                    
                    </div>
                </div>
            );
        }

        return content;
    }

    render () {
        return (this.renderPlayer());
    }
}