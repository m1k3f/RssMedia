# Feed Reader - RSS media reader & player

## Technology & Features

- Single Page Application created with the .Net Core React [project template](https://docs.microsoft.com/en-us/aspnet/core/client-side/spa/react)
- UI: React, Node JS, CSS
- REST API service: [.Net Core 3.1](https://dotnet.microsoft.com/download/dotnet-core/3.1)
- [CodeHollow FeedReader package](https://www.nuget.org/packages/CodeHollow.FeedReader) for retrieving RSS feeds in the API
- [NLog package](https://www.nuget.org/packages/NLog) for logging in the API
- All links to RSS feeds are stored in browser storage. No account is required.
- A new feed can be added in two ways:
  - Direct RSS feed url
  - Any url of a page where RSS Feeds are associated. The service will search for RSS-related HTML 'Link' tags.
- Each feed keeps track of when the user last viewed it. New articles since the last sync are highlighted.

## Known Issues

- Some RSS feeds contain article URLs or media enclosure URLs that are not the final URL, but rather redirect to the final URL. This causes the article viewer window to be blank and the audio player to not play anything.

## Future Enhancements

- Feed Bar: better ability to see all added feeds when there are many and overflow is hidden.
- Option to add a feed group to view articles from multiple feeds of the user's choosing (works similar to the 'All Feeds' button).
- When adding a new feed, the service will search for and display any hyperlinks for a given URL that could be associated to RSS feeds.
- More configuration options in the Settings window.
- Sync feed/feeds every X minutes.
- Light and dark theme with toggle switch.
