import React, { Component } from 'react';

export class Article extends Component {

    constructor(props) {
        super(props);
    }    

    render() {
        let inputId = `input${this.props.count}`;
        let article = this.props.data;

        return(
            <article>
                <input type="checkbox" name="collapse" id={inputId}  />
                <label htmlFor={inputId}>{article.articletitle}</label>
                <p>{article.articlecontent}</p>
            </article>
        );
    }
}