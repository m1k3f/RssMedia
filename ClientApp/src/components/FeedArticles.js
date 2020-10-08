import React, { Component } from 'react';

export class FeedArticles extends Component {

    render() {
        return (
            <div className="divFeedArticles" hidden>
                {/* 
                    Show X number articles for a feed 
                    list of title containers expandable to show content
                    button to load more articles from service
                */}
                {/* <div class="divSpinner">
                    <i class="fas fa-spinner fa-spin fa-lg"></i>
                </div> */}
                <article>
                    <input type="checkbox" name="collapse" id="toggle1" defaultChecked />
                    <label htmlFor="toggle1">Test Article Header 1</label>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at.</p>
                </article>
                <article>
                    <input type="checkbox" name="collapse" id="toggle2" />
                    <label htmlFor="toggle2">Test Article Header 2</label>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at.</p>
                </article>
                {/* <details name="feedArticles" className="detailsFeedArticles">
                    <summary>Test Article Summary 1</summary>
                    <article>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at. </article>
                </details> */}
                {/* <details name="feedArticles" className="detailsFeedArticles">
                    <summary>Test Article Summary 2</summary>
                    <article>Lorem ipsum dolor sit amet, consectetur adipiscing elit. In auctor, purus non condimentum egestas, felis sapien auctor sem, at laoreet lectus justo at purus. Nulla accumsan ligula eu nisl consectetur, sit amet fermentum elit tincidunt. Aenean a vulputate tellus. Mauris accumsan nunc vitae leo hendrerit, vel laoreet neque volutpat. Cras ornare egestas arcu, condimentum lacinia velit tristique quis. Proin congue erat elit, eget pulvinar leo sagittis eget. Nullam eros leo, convallis ac tortor quis, gravida dignissim lectus. Fusce vel ex sed ex scelerisque ultricies. Vivamus tempus facilisis sem id hendrerit. In id ex placerat, aliquam libero eu, tempus dui. Proin tempus gravida magna, sit amet faucibus orci suscipit et. Mauris fringilla tortor a sagittis auctor. Sed molestie euismod turpis, vitae iaculis magna lacinia at. </article>
                </details> */}
            </div>
        );
    }
}