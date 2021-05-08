import React, { Component } from 'react';
import { FaLink, FaPaperclip, FaAngleUp, FaAngleDown } from 'react-icons/fa';
import ReactHtmlParser from 'react-html-parser';

import FeedContext from '../context/FeedContext';
import { EnclosureLink } from './modals/EnclosureLink';
import { ViewLink } from './modals/ViewLink';
import styles from './FeedArticles.module.css';

export class Article extends Component {  

    static contextType = FeedContext;

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

    handleArticleLink = async (e) => {
        let article = this.props.data;
        let showLink = (this.getScreenWidth() > 800 && await this.showIframeLink(article.articleUrl));

        if (article.articleUrl !== null && article.articleUrl.length > 0 && !showLink) {
            let a = document.createElement('a');
            a.href = article.articleUrl;
            a.target="_blank";
            a.rel="noopener noreferrer";
            a.click();
        }
        else {
            this.setState({
                opened: true,
                showViewLink: true,
                showEnclosureModal: false
            });
        }
    }

    handleModalsCallback = () => {
        this.setState({
            opened: true,
            showViewLink: false,
            showEnclosureModal: false
        });
    }

    handleEnclosureClick = (e) => {
        // this.setState({
        //     opened: true,
        //     showViewLink: false,
        //     showEnclosureModal: true
        // })
        const {setSelectedEnclosureArticle} = this.context;
        setSelectedEnclosureArticle(this.props.data);
    }

    getScreenWidth = () => {
        return Math.max(
            document.body.scrollWidth,
            document.documentElement.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.offsetWidth,
            document.documentElement.clientWidth
          );
    }

    showIframeLink = async (url) => {
        let showLink = false;

        let remoteConnection = {
            originalUrl: url
        };

        let request = new Request(process.env.REACT_APP_APIREMOTECONNECTION, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },                    
            body: JSON.stringify(remoteConnection)
        });

        let serviceRemoteConnectObject = await fetch(request).then((response) => response.json());
        if (serviceRemoteConnectObject !== null && serviceRemoteConnectObject.ShowUrlInIframe) {
            showLink = true;
        }

        return showLink;
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
                width: '20px',
                height: '20px'
            };

            content = (
                <button className={`${styles.iconButton} ${styles.feedArticleDetailsButton}`} 
                        onClick={this.handleArticleLink} title="View Full Article">                    
                    <FaLink style={iconStyle} />
                </button>
            );
        }

        return content;
    }

    renderEnclosureButton = () => {
        let content = '';
        let article = this.props.data;
        if (article.articleEnclosureUrl !== null && article.articleEnclosureUrl.length > 0) {
            if (article.articleEnclosureContentType.includes('audio')) {
                let iconStyle = {
                    color: '#4d4d4d',
                    width: '20px',
                    height: '20px'
                };

                content = (
                    <button className={`${styles.iconButton} ${styles.feedArticleDetailsButton}`} 
                            onClick={this.handleEnclosureClick} title="View Attachment">
                        <FaPaperclip style={iconStyle} />
                    </button>
                );
            }
        }
        
        return (content);
    }

    renderArticleImage = () => {
        let content = '';
        let article = this.props.data;
        if (article.articleImageUrl != null && article.articleImageUrl.length > 0) {
            content = (
                <img src={article.articleImageUrl} className={styles.feedArticleImage} alt="" />
            );
        }
        else if (article.articleEnclosureUrl !== null && article.articleEnclosureUrl.length > 0 &&
                article.articleEnclosureContentType !== null && article.articleEnclosureContentType.includes('image')) {
            content = (
                <img src={article.articleEnclosureUrl} className={styles.feedArticleImage} alt="" />
            );
        }

        return (content);
    }

    renderModal = () => {
        let content = '';
        if (this.state.showViewLink) {
            content = <ViewLink article = {this.props.data} articleCallback = {this.handleModalsCallback} />
        }
        // else if (this.state.showEnclosureModal) {
        //     content = <EnclosureLink article = {this.props.data} articleCallback = {this.handleModalsCallback} />
        // }

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

        let articleColor = '#495f69';
        let headerButtonStyle = {
            backgroundColor: articleColor //default to unread color
        };
        
        if (article.articlePublishingDate != null) {
            let publishDate = new Date(article.articlePublishingDate);
            let lastAccessedDate = new Date(this.props.feedLastAccessed);
            let firstAccess = this.props.feedFirstAccess;
            if (publishDate < lastAccessedDate && !firstAccess) {
                articleColor = '#34444b';
                headerButtonStyle = {
                    backgroundColor: articleColor //read color
                };
            }
        }

        let expandIconStyle = {
            paddingLeft: '15px',
            backgroundColor: headerButtonStyle.backgroundColor,
            width: '26px',
            height: '26px'
        };

        let angleIcon = (this.state.opened) ? 
                        <FaAngleUp style={expandIconStyle} /> :
                        <FaAngleDown style={expandIconStyle} />;
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
                            {angleIcon}
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