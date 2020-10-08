import React, { Component } from 'react';
import { FeedBar } from './FeedBar';
import { FeedArticles } from './FeedArticles';


export class Content extends Component {

    constructor(props) {
        super(props);
        this.state = {
            articles: []
        }
    }

    feedClickCallback = (feedArticles) => {
        this.setState({
            articles: feedArticles
        })
    }

    // renderArticles = () => {
    //     let content = this.state.articles.map((article) => {
    //         return (<Article data = {article} />);
    //     });

    //     return(
    //         <div>
    //             {content}
    //         </div>
    //     );
    // }

    render() {
        return (
            <main>
                <FeedBar contentCallback = {this.feedClickCallback} />
                <FeedArticles data = {this.state.articles} />                
            </main>
        );
    }
}

//export default Content;