import React, { Component } from 'react';

export class MaxArticlesOptions extends Component {


    render() {
        return (
            <React.Fragment>
                <p>Max. Articles:</p>
                <input type="radio" name="maxArticles" id="max20" checked />
                <label for="max20">20</label>
                <input type="radio" name="maxArticles" id="max50" />
                <label for="max50">50</label>
            </React.Fragment>
        );
    }
}