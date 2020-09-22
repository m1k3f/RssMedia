import React, { Component } from 'react';

export class FeedArticles extends Component {

    render() {
        return (
            <div className="divFeedArticles">
                {/* 
                    Show X number articles for a feed 
                    list of title containers expandable to show content
                    button to load more articles from service
                */}
                <details name="feedArticles" className="detailsFeedArticles">
                    <summary>Test Article Summary 1</summary>
                    <article>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at. </article>
                </details>
                <details name="feedArticles" className="detailsFeedArticles">
                    <summary>Test Article Summary 2</summary>
                    <article>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at. </article>
                </details>
            </div>
        );
    }
}

//export default FeedArticles;