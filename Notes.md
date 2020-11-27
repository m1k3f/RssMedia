# RSS Media App

## Remaining Items

- Issue: New Feed modal pops up after saving feed details
- Issue: Multi Feed modal popus up again after selecting feed
- ~~Issue: Show feed article section even if no articles were found~~
- Article Controls Sync button logic
- ~~Article Controls Edit button logic~~
- All Feeds button functionality
- ~~Sort feed links alphabetically~~
- Remove all feeds button & modal: modal to verify delete
- Save feeds to file button: file in OPML format
- Add Home button to article controls that links to baseUrl
- Show spinner when articles are loading
- ~~Fade in feedbar feedlinks on load & refresh~~
- When no feeds saved, show centered Add button with description; on first feed save, animate feedbar expand and fade out centered add button
- Article View Link: resolve article url in service before showing iframe
- Display content when no feed button selected (no articles showing): default to all feeds?
- Question mark button & modal: app description, how to use
- Settings button: # articles displayed, sort feedbar buttons alphabetically/createDate/custom drag, export feeds to file?, remove all feeds?
- ~~Drag and drop feed buttons for reorganizing: draggable feedlinks, add feedlink position property~~
- Style feed header bars based on read/unread: feedLink lastAccessed datetime property

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
  - https://dotnetcoretutorials.com/2018/02/27/loading-parsing-web-page-net-core/
- RSS Feed interaction
  - https://www.nuget.org/packages?q=Tags%3A%22rss%22

## Component Layout
- App
  - NavMenu
  - Content
    - Feedbar
      - FeedLinkAdd
        - modals/NewFeed
        - modals/MultiFeedSelection
      - FeedLinkAll
      - FeedLinks
        - FeedLink          
    - FeedArticles
      - Article

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
      