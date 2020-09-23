# RSS Media App

## Requirements

- Simple, minimal RSS feed reader.
- Feeds can be added with direct RSS URL, or main URL of site and app searches for RSS URL
- 'All Feeds' button to view recent articles from all feeds
- Podcast/Mp3 player on article when exists
- Youtube/Video player on article when exists?
- Stores feeds in browser storage
- Imports/Exports feed list
- Feeds have similar look & feel to a twitter feed 
  - poll rss feeds every X minutes
  - Slide down current articles and fade in new articles

## Tech

- HTML, CSS; Javascript, React, Angular, or .NET Core MVC
- .NET Core/NodeJS API - read in webpages
  - Fetch content of a webpage: https://stackoverflow.com/questions/5299646/javascript-how-to-fetch-the-content-of-a-web-page

## Layout & Flow
- RSSMedia single page app
  - Navbar - Title? (left), ~~Github link (right)~~
  - Main Content
    - Feed bar
      - Add button container
        - Requests URL for RSS feed or web page
        - ~~Add button~~
          - button click: show popup modal
        - Popup modal  
          - text, textbox, save button
          - button click: send URL to service...
            - if URL is RSS feed, return list of articles
            - else...
               - fetch URL content
               - search content for RSS feed
               - return list of articles        
      - Feed titles container
        - shows list of saved feeds, 'All Feeds' option always exists        
        - buttons, left-to-right, line wrap, overflow scrolling
        - button click: ~~highlight button,~~ show feed articles in feed reader container
    - Feed articles
      - shows X number articles for a feed
      - list of title containers expandable to show content
      - button to load more articles from service
      