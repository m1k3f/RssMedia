import React, { Component } from 'react';
import FeedContext from './context/FeedContext';
import { Article } from './Article';

export class FeedArticles extends Component {

    constructor(props) {
        super(props);

        this.state = {
            selectedFeed: null
        }
    }

    static contextType = FeedContext;

    componentDidMount() {
        const feed = this.context;
        if (feed !== undefined) {
            this.setState({
                selectedFeed: feed
            })
        }
    }

    renderArticles = () => {
        let feed = this.state.selectedFeed;
        let content = '';
        if (feed !== null) {
            let feedArticles = feed.FeedArticles;
            let articleCount = 0;
            content = feedArticles.map((article) => {
                articleCount++;            
                return (<Article count = {articleCount} data = {article} />);
            });
        }

        return(
            <div>
                {content}
            </div>
        );
    }

    render() {
        return (
            <div className="divFeedArticles">
                {/* 
                    Show X number articles for a feed 
                    list of title containers expandable to show content
                    button to load more articles from service
                */}
                <div className="divSpinner" hidden>
                    <i className="fas fa-spinner fa-spin fa-lg"></i>
                </div>
                {this.renderArticles()}
                
                {/* <article>
                    <input type="checkbox" name="collapse" id="toggle1" defaultChecked />
                    <label htmlFor="toggle1">Test Article Header 1</label>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at.</p>
                </article>
                <article>
                    <input type="checkbox" name="collapse" id="toggle2" />
                    <label htmlFor="toggle2">Test Article Header 2</label>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at.</p>
                </article> */}
            </div>
        );
    }
}