using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using RssMedia.Models;
using CodeHollow.FeedReader;

namespace RssMedia.Controllers {
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class RssMediaController : ControllerBase {
        private readonly ILogger<RssMediaController> _logger;
        private HttpClient _client;
        public RssMediaController(ILogger<RssMediaController> logger) 
        {
            _logger = logger;
            _client = new HttpClient();
        }

        [HttpPost]
        [ActionName("GetFeedLinks")]
        public async Task<IEnumerable<Models.FeedLink>> GetFeedLinks([FromBody]Models.FeedLink feedLink)
        {          
            try
            {                
                var feedAccess = new RSS.FeedAccess(feedLink);
                var feedLinkList = await feedAccess.GetFeedLinkList();                

                return feedLinkList;                
            }
            catch(Exception ex)
            {
                var errorMessage = ex.Message;
                return new List<Models.FeedLink>();
            }            
        }

        [HttpPost]
        [ActionName("Feed")]
        public async Task<Models.Feed> Feed([FromBody]Models.Feeds feeds)
        {           
            var feed = feeds.FeedList.First();

            try
            {              
                if (!string.IsNullOrEmpty(feed.FeedRssUrl))
                {
                    var decodedFeedRssUrl = WebUtility.UrlDecode(feed.FeedRssUrl);
                    var rssFeed = await GetRssFeed(decodedFeedRssUrl).ConfigureAwait(false);
                    var feedData = new RSS.FeedData(rssFeed);

                    feed.Id = Guid.NewGuid();
                    //feed.FeedTitle = rssFeed.Title;
                    feed.FeedImageUrl = (!string.IsNullOrEmpty(rssFeed.ImageUrl)) ? WebUtility.UrlEncode(rssFeed.ImageUrl) : string.Empty;
                    
                    var articleList = feedData.GetArticles();
                    var articleCount = (feeds.FeedArticleCount > articleList.Count) ? articleList.Count : feeds.FeedArticleCount;
                    feed.FeedArticles = RSS.FeedData.GetFilteredArticles(articleList, feeds.FeedArticleOffset, articleCount);                      
                }
                else 
                {
                    feed.FeedArticles = null;
                }

                return feed;
            }
            catch(Exception ex)
            {
                return GetFeedWithError(feed, ex);
            }
        }

        [HttpPost]
        [ActionName("AllFeeds")]
        public async Task<Models.Feed> AllFeeds(Models.Feeds feeds) 
        {
            Models.Feed allFeed = null;            
            try
            {
                allFeed = new Models.Feed() 
                {
                    Id = Guid.NewGuid(),
                    FeedLinkId = Guid.Empty,
                    FeedName = "All Feeds",
                    FeedTitle = "All Feeds",
                    FeedImageUrl = string.Empty,
                    FeedRssUrl = string.Empty
                };

                var articleList = new List<Models.Article>();
                RSS.FeedData feedData = null;
                foreach (var feedItem in feeds.FeedList)
                {
                    var decodedFeedRssUrl = WebUtility.UrlDecode(feedItem.FeedRssUrl);
                    var rssFeed = await GetRssFeed(decodedFeedRssUrl).ConfigureAwait(false);
                    feedData = new RSS.FeedData(rssFeed, feedItem.FeedName);

                    var articles = feedData.GetArticles();
                    var articleCount = (articles.Count < 10) ? articles.Count : 10; //max 10 articles from feed
                    var feedArticles = RSS.FeedData.GetFilteredArticles(articles, 0, articleCount);
                    
                    articleList.AddRange(feedArticles);
                }

                var allArticleCount = (feeds.FeedArticleCount > articleList.Count) ? articleList.Count : feeds.FeedArticleCount;
                allFeed.FeedArticles = RSS.FeedData.GetFilteredArticles(articleList, feeds.FeedArticleOffset, allArticleCount);

                return allFeed;
            }
            catch(Exception ex) 
            {
                return GetFeedWithError(allFeed, ex);
            }
        }

        [HttpPost]
        [ActionName("DownloadFeeds")]
        public async Task<IActionResult> DownloadFeeds(Models.Feeds feeds)
        {
            Stream fileStream = await RSS.FileDownload.GetFeedFileStream(feeds);
            string mimeType = "application/xml";

            return new FileStreamResult(fileStream, mimeType)
            {
                FileDownloadName = "Feeds.opml"
            };
        }

        [HttpGet("{originalUrl}")]
        [ActionName("ResolvedUrl")]
        public async Task<IActionResult> ResolvedUrl(string originalUrl)
        {            
            try 
            {
                //var originalUrlDeserialized = JsonSerializer.Deserialize<string>(originalUrl.ToString());
                //var originalUrlValue = originalUrl["originalUrl"].ToString();
                if (!string.IsNullOrEmpty(originalUrl))
                {
                    var decodedOriginalUrl = WebUtility.UrlDecode(originalUrl);
                    var resolvedUrl = await RSS.Utilities.GetRedirectedUrl(decodedOriginalUrl);
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
                // var urlJson = new Dictionary<string, string>()
                // {
                //     {"resolvedUrl", originalUrl}
                // };
                return StatusCode(500, ex.Message);
            }            
        }

        #region Private Methods

        private Models.Feed GetFeedWithError(Models.Feed feed, Exception exception)
        {
            feed.FeedArticles = null;
            feed.FeedError = new FeedError()
            {
                ErrorMessage = exception.Message,
                StackTrace = exception.StackTrace
            };
            return feed;
        }

        private async Task<CodeHollow.FeedReader.Feed> GetRssFeed(string url)
        {
            var rssFeed = await FeedReader.ReadAsync(url);
            var specifiedFeed = rssFeed;
            
            if (rssFeed.Type == FeedType.Rss_2_0)
            {
                specifiedFeed = ((CodeHollow.FeedReader.Feeds.Rss20Feed)rssFeed.SpecificFeed).ToFeed();
            }
            else if (rssFeed.Type == FeedType.MediaRss)
            {
                specifiedFeed = ((CodeHollow.FeedReader.Feeds.MediaRssFeed)rssFeed.SpecificFeed).ToFeed();
            }

            return specifiedFeed;
        }

        #endregion
    }
}