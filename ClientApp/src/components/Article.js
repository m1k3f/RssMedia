import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class Article extends Component {  

    state = {
        opened: false
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

    render() {
        let article = this.props.data;
        let publishDateTime = new Date(article.articlePublishingDate);
        let formattedPublishDateTime = `${publishDateTime.getMonth() + 1}/${publishDateTime.getDay()}/${publishDateTime.getFullYear()}`;

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
                    {ReactHtmlParser(article.articleDescription)}
                </section>
            </article>
        );
    }
}