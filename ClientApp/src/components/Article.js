import React, { Component } from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export class Article extends Component {  

    render() {
        let inputId = `input${this.props.count}`;
        let article = this.props.data;

        return(
            <article>
                <input type="checkbox" name="collapse" id={inputId}  />
                <label htmlFor={inputId}>{article.articleTitle}</label>
                <section>{ReactHtmlParser(article.articleDescription)}</section>
            </article>
        );
    }
}