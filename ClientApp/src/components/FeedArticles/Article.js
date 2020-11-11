import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { ViewLink } from './modals/ViewLink';

export class Article extends Component {  

    state = {
        opened: false,
        showViewLink: false
    }

    handleHeaderClick = (e) => {
        if (this.state.opened) {
            this.setState({
                opened: false
            });
        }
        else {
            this.setState({
                opened: true
            });
        }
    }

    handleArticleLink = (e) => {
        this.setState({
            showViewLink: true
        });
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

    renderViewLinkModal = (show) => {
        let content = '';
        if (show) {
            content = <ViewLink article = {this.props.data} />
        }

        return content;
    }

    render() {
        let article = this.props.data;

        let author = (article.articleAuthor !== null) ? 
                        `by ${article.articleAuthor}` : 
                        '';
        let publishDateTime = new Date(article.articlePublishingDate.toLocaleString());
        let formattedPublishDateTime = this.getFormattedDateTime(publishDateTime);

        let angleIcon = (this.state.opened) ? 'fas fa-angle-up fa-2x' : 'fas fa-angle-down fa-2x';
        let sectionStyle = {
            maxHeight: (this.state.opened) ? '200px' : '0'
        }

        return(
            <article name="feedArticle">
                <button onClick={this.handleHeaderClick}>
                    <div>
                        <p>{article.articleTitle}</p>
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
                            <i class="fas fa-link"></i>
                        </button>
                    </div>
                    <div>
                        {ReactHtmlParser(article.articleDescription)}
                    </div>                    
                    {this.renderViewLinkModal(this.state.showViewLink)}
                </section>
            </article>
        );
    }
}