# RSS Media App

## Deployment

- https://www.youtube.com/watch?v=WUAhKhWgsIg
- https://github.com/charlesbill/TheSolutionArchitect/tree/linuxbasics-dev
- https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-apache?view=aspnetcore-5.0
- dotnet build, dotnet run
- publish self-contained for RPi: dotnet publish -r linux-arm

## Remaining Items

- ~~Issue: Article View Link - url not final url; resolve article url in service before showing modal~~
- ~~Issue: Article Enclosure Link - url not final url; resolve url before showing modal~~
- Issue: added Reason feed, delete feed, add Reason feed again -> shows in FeedBar 2nd to last instead of last
- Issue: added NPR feed with npr.org, no feed found; added NPR feed with http://npr.org, feed found
- ~~Issue: resolve Enclosure url on play instead of on Enclosure mount~~
- Issue: fix service HttpClient to use correctly
- Issue: Enclosure button shows in article, but it is not audio -> check enclosure to see if audio/video
- Article Controls Sync button logic
- Feed Title: ~~use FeedLink title, allow for changing on feed edit,~~ refresh Title
- ~~Display content when no feed button selected (no articles showing): default to all feeds?~~
- ~~Add LastAccessed datetime to JSON for each feedlink, highlight new articles published after that datetime~~
- Add LastAccessed datetime to JSON for all feeds
- App info: info button & modal, or help box shown on app start; shows app description, how to use
- Settings button:
  - Number articles displayed
  - sort feedbar buttons alphabetically/createDate/custom drag
  - import feeds from opml file to UI & web storage
  - export feeds from UI & web storage to opml file
  - remove all feeds: hide button and warning with expand/collapse
  - toggle between dark and light theme
- Feed Controls: Add Home button that links to baseUrl
- Show spinner when articles are loading: use spinning sync button or articles spinner
- When no feeds exist, show centered Add button with description; on first feed save, animate feedbar expand and fade out centered add button
- FeedLinks: option to show feed group to show all feed articles in group
  - show feed articles when group is clicked
  - article controls edit - show/add feeds in group
- Feed Controls Edit: checkbox to make default feed to show on start
- ~~Feed Controls Image: enlarge on hover~~
- Feed Controls Sync: sync on a timer every X minutes

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
      