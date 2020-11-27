import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { EnclosureLink } from './modals/EnclosureLink';
import { ViewLink } from './modals/ViewLink';

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
            showViewLink: true,
            showEnclosureModal: false
        });
    }

    handleEnclosureClick = (e) => {
        this.setState({
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

    renderEnclosureButton = () => {
        let content = '';
        let article = this.props.data;
        if (article.articleEnclosureUrl != null && article.articleEnclosureUrl.length > 0) {
            content = (
                <button onClick={this.handleEnclosureClick}>
                    <i className="fas fa-paperclip"></i>
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
                <img src={article.articleImageUrl} />
            );
        }

        return (content);
    }

    renderModal = () => {
        let content = '';
        if (this.state.showViewLink) {
            content = <ViewLink article = {this.props.data} />
        }
        else if (this.state.showEnclosureModal) {
            content = <EnclosureLink article = {this.props.data} />
        }

        return content;
    }

    render() {
        let article = this.props.data;

        let articleTitle = (article.articleFullTitle !== null) ? article.articleFullTitle : article.articleTitle;
        let author = (article.articleAuthor !== null) ? 
                        `by ${article.articleAuthor}` : 
                        '';
        let publishDateTime = new Date(article.articlePublishingDate.toLocaleString());
        let formattedPublishDateTime = this.getFormattedDateTime(publishDateTime);

        let angleIcon = (this.state.opened) ? 'fas fa-angle-up fa-2x' : 'fas fa-angle-down fa-2x';
        let sectionStyle = {
            maxHeight: (this.state.opened) ? '50vh' : '0'
        }

        return(
            <article name="feedArticle">
                <button onClick={this.handleHeaderClick}>
                    <div>
                        <p>{articleTitle}</p>
                        <div>
                            <p>{formattedPublishDateTime}</p>
                            <i className={angleIcon}></i>
                        </div>
                    </div>
                </button>
                <section style={sectionStyle}>
                    <div>
                        <p>{author}</p>
                        <button onClick={this.handleArticleLink}>
                            <i className="fas fa-link fa-lg"></i>
                        </button>
                        {this.renderEnclosureButton()}
                    </div>
                    <div>
                        <div>{ReactHtmlParser(article.articleDescription)}</div>
                        {this.renderArticleImage()}
                    </div>                    
                    {this.renderModal()}
                </section>
            </article>
        );
    }
}