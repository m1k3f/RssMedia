using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;

using Models.Reader;

namespace RssMedia.Controllers {
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RssMediaController : ControllerBase {
        private IHttpClientFactory _client;
        private readonly ILogger<RssMediaController> _logger;
        public RssMediaController(ILogger<RssMediaController> logger, IHttpClientFactory client) 
        {
            _logger = logger;
            _client = client;
        }

        [HttpPost]
        [ActionName("GetFeedLinks")]
        public async Task<IEnumerable<FeedLink>> GetFeedLinks([FromBody]FeedLink feedLink)
        {          
            try
            {                
                var feedAccess = new Reader.FeedAccess(_client, feedLink);
                var feedLinkList = await feedAccess.GetFeedLinkList();                

                return feedLinkList;                
            }
            catch(Exception ex)
            {
                var errorMessage = ex.Message;
                return new List<FeedLink>();
            }            
        }

        [HttpPost]
        [ActionName("GetFeedLinksList")]
        public async Task<IEnumerable<FeedLink>> GetFeedLinksList([FromBody]IEnumerable<FeedLink> feedLinksList)
        {
            var returnFeedLinkList = new List<FeedLink>();
            foreach(var link in feedLinksList)
            {
                try
                {
                    IEnumerable<FeedLink> finalFeedLinkList = new List<FeedLink>();

                    if (link.PopulateRemoteData)
                    {
                        var feedAccess = new Reader.FeedAccess(_client, link);
                        finalFeedLinkList = await feedAccess.GetFeedFromFeedUrl();
                    }                    

                    FeedLink finalFeedLink = null;
                    if (finalFeedLinkList.Count() == 0)
                    {
                        //Not populating data remotely, or no remote data was found right now
                        finalFeedLink = new FeedLink()
                        {
                            Id = Guid.NewGuid(),
                            Title = link.Name,
                            Url = link.AddUrl,
                            Name = link.Name,
                            AddUrl = link.AddUrl
                        };
                    }
                    else 
                    {
                        finalFeedLink = finalFeedLinkList.First();
                    }

                    returnFeedLinkList.Add(finalFeedLink);
                }
                catch(Exception)
                {
                    var finalFeedLink = new FeedLink()
                    {
                        Id = Guid.NewGuid(),
                        Title = link.Name,
                        Url = link.AddUrl,
                        Name = link.Name,
                        AddUrl = link.AddUrl,
                        PopulateRemoteData = link.PopulateRemoteData
                    };
                    returnFeedLinkList.Add(finalFeedLink);
                }
            }

            return returnFeedLinkList;
        }

        [HttpPost]
        [ActionName("Feed")]
        public async Task<Feed> Feed([FromBody]Feeds feeds)
        {           
            var feed = feeds.FeedList.First();

            try
            {              
                if (!string.IsNullOrEmpty(feed.FeedRssUrl))
                {
                    var decodedFeedRssUrl = WebUtility.UrlDecode(feed.FeedRssUrl);
                    var rssFeed = await GetRssFeed(decodedFeedRssUrl, false).ConfigureAwait(false);                    
                    var feedData = new Reader.FeedData(rssFeed);

                    feed.Id = Guid.NewGuid();
                    feed.FeedImageUrl = (!string.IsNullOrEmpty(rssFeed.ImageUrl)) ? WebUtility.UrlEncode(rssFeed.ImageUrl) : string.Empty;
                    
                    var articleList = feedData.GetArticles();
                    var articleCount = (feeds.FeedArticleCount > articleList.Count) ? articleList.Count : feeds.FeedArticleCount;
                    feed.FeedArticles = Reader.FeedData.GetFilteredArticles(articleList, feeds.FeedArticleOffset, articleCount);                                       
                }
                else 
                {
                    feed.FeedArticles = null;
                }

                return feed;
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving Feed '{feed.FeedName}'", null);
                return GetFeedWithError(feed, ex);
            }
        }

        [HttpPost]
        [ActionName("AllFeeds")]
        public async Task<Feed> AllFeeds(Feeds feeds) 
        {
            Feed allFeed = null;            
            try
            {
                allFeed = new Feed() 
                {
                    Id = Guid.NewGuid(),
                    FeedLinkId = Guid.Empty,
                    FeedName = "All Feeds",
                    FeedTitle = "All Feeds",
                    FeedImageUrl = string.Empty,
                    FeedRssUrl = string.Empty
                };

                var articleList = new List<Article>();
                Reader.FeedData feedData = null;
                foreach (var feedItem in feeds.FeedList)
                {
                    var decodedFeedRssUrl = WebUtility.UrlDecode(feedItem.FeedRssUrl);
                    var rssFeed = await GetRssFeed(decodedFeedRssUrl, true).ConfigureAwait(false);
                    if (rssFeed != null)
                    {
                        feedData = new Reader.FeedData(rssFeed, feedItem.FeedName);

                        var articles = feedData.GetArticles();
                        var articleCount = (articles.Count < 10) ? articles.Count : 10; //max 10 articles from feed
                        var feedArticles = Reader.FeedData.GetFilteredArticles(articles, 0, articleCount);
                        
                        articleList.AddRange(feedArticles);
                    }
                }

                var allArticleCount = (feeds.FeedArticleCount > articleList.Count) ? articleList.Count : feeds.FeedArticleCount;
                allFeed.FeedArticles = Reader.FeedData.GetFilteredArticles(articleList, feeds.FeedArticleOffset, allArticleCount);

                return allFeed;
            }
            catch(Exception ex) 
            {
                return GetFeedWithError(allFeed, ex);
            }
        }

        [HttpPost]
        [ActionName("DownloadFeeds")]
        public IActionResult DownloadFeeds(Feeds feeds)
        {
            try
            {
                Stream fileStream = Reader.FileDownload.GetFeedFileStream(feeds);
                string mimeType = "text/x-opml+xml";

                return new FileStreamResult(fileStream, mimeType)
                {
                    FileDownloadName = "Feeds.opml"
                };
            }
            catch(Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpPost]
        [ActionName("ResolvedUrl")]
        public async Task<IActionResult> ResolvedUrl([FromBody]Dictionary<string, string> originalUrl)
        {            
            try 
            {        
                var originalUrlValue = (originalUrl.Count > 0) ? originalUrl.First().Value : string.Empty;
                if (!string.IsNullOrEmpty(originalUrlValue))
                {
                    var decodedOriginalUrl = WebUtility.UrlDecode(originalUrlValue);
                    var utilities = new Reader.UtilitiesService(_client);
                    var resolvedUrl = await utilities.GetRedirectedUrl(decodedOriginalUrl);

                    var urlJson = new Dictionary<string, string>() 
                    {
                        {"resolvedUrl", resolvedUrl}
                    };
                    return Ok(urlJson);
                }
                else 
                {
                    var urlJson = new Dictionary<string, string>()
                    {
                        {"resolvedUrl", string.Empty}
                    };
                    return Ok(urlJson);
                }
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, $"Error resolving url '{originalUrl.First().Value}'", null);
                return StatusCode(500, ex.Message);
            }            
        }

        [HttpPost]
        [ActionName("RemoteConnect")]
        public async Task<IActionResult> RemoteConnect([FromBody]RemoteConnection connection)
        {
            try
            {
                if (!string.IsNullOrEmpty(connection.OriginalUrl))
                {
                    var utilities = new Reader.UtilitiesService(_client);
                    connection = await utilities.GetConnectionDetails(connection);
                }

                var connectionJson = JsonSerializer.Serialize(connection);

                return Ok(connectionJson);
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, $"Error connecting to '{connection.OriginalUrl}'", null);
                return StatusCode(500, ex.Message);
            }
        }

        #region Private Methods

        private Feed GetFeedWithError(Feed feed, Exception exception)
        {
            feed.FeedArticles = null;
            feed.FeedError = new FeedError()
            {
                ErrorMessage = exception.Message,
                StackTrace = exception.StackTrace
            };
            return feed;
        }

        private async Task<CodeHollow.FeedReader.Feed> GetRssFeed(string url, bool suppressErrors)
        {
            try
            {
                var rssFeed = await CodeHollow.FeedReader.FeedReader.ReadAsync(url);
                var specifiedFeed = rssFeed;
                
                if (rssFeed.Type == CodeHollow.FeedReader.FeedType.Rss_2_0)
                {
                    specifiedFeed = ((CodeHollow.FeedReader.Feeds.Rss20Feed)rssFeed.SpecificFeed).ToFeed();
                }
                else if (rssFeed.Type == CodeHollow.FeedReader.FeedType.MediaRss)
                {
                    specifiedFeed = ((CodeHollow.FeedReader.Feeds.MediaRssFeed)rssFeed.SpecificFeed).ToFeed();
                }

                return specifiedFeed;
            }
            catch(Exception ex)
            {
                if (suppressErrors)
                    return null;
                else 
                    throw ex;
            }
        }

        #endregion
    }
}