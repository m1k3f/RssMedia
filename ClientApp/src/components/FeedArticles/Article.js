import React, { Component } from 'react';

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EnclosureLink } from './modals/EnclosureLink';
import { ViewLink } from './modals/ViewLink';
import styles from './FeedArticles.module.css';

export class Article extends Component {  

    state = {
        opened: false,
        showViewLink: false,
        showEnclosureModal: false
    }

    handleHeaderClick = (e) => {
        if (this.state.opened) {
            this.setState({
                opened: false,
                showViewLink: false,
                showEnclosureModal: false
            });
        }
        else {
            this.setState({
                opened: true,
                showViewLink: false,
                showEnclosureModal: false
            });
        }
    }

    handleArticleLink = (e) => {
        this.setState({
            opened: true,
            showViewLink: true,
            showEnclosureModal: false
        });
    }

    handleModalsCallback = () => {
        this.setState({
            opened: true,
            showViewLink: false,
            showEnclosureModal: false
        });
    }

    handleEnclosureClick = (e) => {
        this.setState({
            opened: true,
            showViewLink: false,
            showEnclosureModal: true
        })
    }

    getFormattedDateTime = (dateTimeValue) => {
        let currentMonth = dateTimeValue.getMonth() + 1;
        let month = (currentMonth < 10) ? "0" + currentMonth : currentMonth;
        let day = (dateTimeValue.getDate() < 10) ? "0" + dateTimeValue.getDate() : dateTimeValue.getDate();
        let hours = (dateTimeValue.getHours() < 10) ? "0" + dateTimeValue.getHours() : dateTimeValue.getHours();
        let minutes = (dateTimeValue.getMinutes() < 10) ? "0" + dateTimeValue.getMinutes() : dateTimeValue.getMinutes();
        return (
            `${month}/${day}/${dateTimeValue.getFullYear()} ${hours}:${minutes}`
        );
    }

    renderViewLinkButton = () => {
        let content = '';
        let article = this.props.data;
        if (article.articleUrl !== null && article.articleUrl.length > 0) {
            let iconStyle = {
                color: '#4d4d4d',
                fontSize: '20px'
            };

            content = (
                <button className={`${styles.iconButton} ${styles.feedArticleDetailsButton}`} 
                        onClick={this.handleArticleLink} title="View Full Article">
                    <i className="fas fa-link fa-lg" style={iconStyle}></i>
                </button>
            );
        }

        return content;
    }

    renderEnclosureButton = () => {
        let content = '';
        let article = this.props.data;
        if (article.articleEnclosureUrl !== null && article.articleEnclosureUrl.length > 0) {
            let iconStyle = {
                color: '#4d4d4d',
                fontSize: '20px'
            };

            content = (
                <button className={`${styles.iconButton} ${styles.feedArticleDetailsButton}`} 
                        onClick={this.handleEnclosureClick} title="View Attachment">
                    <i className="fas fa-paperclip fa-lg" style={iconStyle}></i>
                </button>
            );
        }
        
        return (content);
    }

    renderArticleImage = () => {
        let content = '';
        let article = this.props.data;
        if (article.articleImageUrl != null && article.articleImageUrl.length > 0) {
            content = (
                <img src={article.articleImageUrl} style={{marginBottom:'10px'}} />
            );
        }

        return (content);
    }

    renderModal = () => {
        let content = '';
        if (this.state.showViewLink) {
            content = <ViewLink article = {this.props.data} articleCallback = {this.handleModalsCallback} />
        }
        else if (this.state.showEnclosureModal) {
            content = <EnclosureLink article = {this.props.data} articleCallback = {this.handleModalsCallback} />
        }

        return content;
    }

    render() {
        let article = this.props.data;

        let articleTitle = (article.articleFullTitle !== null) ? article.articleFullTitle : article.articleTitle;
        let author = (article.articleAuthor !== null) ? 
                        <div><p className={styles.feedArticleAuthor}>by {article.articleAuthor}</p></div> : 
                        null;
        
        let formattedPublishDateTime = null;
        if (article.articlePublishingDate !== null) {
            let publishDateTime = new Date(article.articlePublishingDate.toLocaleString());
            formattedPublishDateTime = this.getFormattedDateTime(publishDateTime);
        }

        let articleColor = '#546e7a';
        let headerButtonStyle = {
            backgroundColor: articleColor //default to unread color
        };
        
        if (article.articlePublishingDate != null) {
            let publishDate = new Date(article.articlePublishingDate);
            let lastAccessedDate = new Date(this.props.feedLastAccessed);
            let firstAccess = this.props.feedFirstAccess;
            if (publishDate < lastAccessedDate && !firstAccess) {
                articleColor = '#37474f';
                headerButtonStyle = {
                    backgroundColor: articleColor //read color
                };
            }
        }

        let expandIconStyle = {
            paddingLeft: '15px',
            backgroundColor: headerButtonStyle.backgroundColor,
            fontSize: '20px'
        };

        let angleIcon = (this.state.opened) ? 'fas fa-angle-up fa-2x' : 'fas fa-angle-down fa-2x';
        let sectionStyle = {
            maxHeight: (this.state.opened) ? '50vh' : '0',
            border: `1px solid ${articleColor}`
        }

        return(
            <article className={styles.feedArticle} name="feedArticle">
                <button className={styles.headerButton} style={headerButtonStyle} 
                        onClick={this.handleHeaderClick}>
                    <div className={styles.headerButtonContent} style={headerButtonStyle}>
                        <p className={styles.headerButtonText} style={headerButtonStyle}>{articleTitle}</p>
                        <div className={styles.headerButtonRight} style={headerButtonStyle}>
                            <p className={styles.headerButtonRightText} style={headerButtonStyle}>
                                {formattedPublishDateTime}
                            </p>
                            <i style={expandIconStyle} className={angleIcon}></i>
                        </div>
                    </div>
                </button>
                <section className={styles.feedArticleContent} style={sectionStyle}>
                    <div className={styles.feedArticleDetails}>
                        <h3 style={{margin:'0'}}>{article.articleTitle}</h3>
                        <div>
                            {this.renderViewLinkButton()}
                            {this.renderEnclosureButton()}
                        </div>
                    </div>
                    {author}
                    <div>
                        <div style={{marginBottom:'10px'}}>
                            {ReactHtmlParser(article.articleDescription)}
                        </div>
                        {this.renderArticleImage()}
                    </div>                    
                    {this.renderModal()}
                </section>
            </article>
        );
    }
}