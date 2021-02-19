import React, { Component } from 'react';

import { FeedProvider } from './context/FeedContext';
import { NavMenu } from './NavMenu/NavMenu';
import { Content } from './Content';
import styles from './Content.module.css';
import '../css/rssmedia.css';

export class Reader extends Component {

    render() {
        return (
            <div className={`fade-in ${styles.readerApp}`}>
                <FeedProvider>
                    <NavMenu />
                    <Content />
                </FeedProvider>
            </div>
        );
    }
}