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

        // [HttpPost]
        // [ActionName("FeedLinks")]
        // public async Task<IEnumerable<Models.FeedLink>> FeedLinks([FromBody]Models.FeedLink feedLink)
        // {            
        //     try
        //     {
        //         var feedLinkList = new List<Models.FeedLink>();
        //         var decodedBaseUrl = WebUtility.UrlDecode(feedLink.BaseUrl);

        //         var urlList = await FeedReader.GetFeedUrlsFromUrlAsync(decodedBaseUrl).ConfigureAwait(false);
        //         foreach (var link in urlList)
        //         {
        //             var guidId = (feedLink.Id == null || feedLink.Id == Guid.Empty) ? Guid.NewGuid() : feedLink.Id;
        //             feedLinkList.Add(new FeedLink() {
        //                 Id = guidId,
        //                 Title = link.Title,
        //                 Url = WebUtility.UrlEncode(link.Url),
        //                 Name = feedLink.Name,
        //                 BaseUrl = feedLink.BaseUrl
        //             });
        //         }

        //         return feedLinkList;
        //     }
        //     catch(Exception)
        //     {
        //         return null;
        //     }
        // }

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

                    feed.Id = Guid.NewGuid();
                    feed.FeedTitle = rssFeed.Title;
                    feed.FeedImageUrl = (!string.IsNullOrEmpty(rssFeed.ImageUrl)) ? WebUtility.UrlEncode(rssFeed.ImageUrl) : string.Empty;
                    
                    var articleList = GetArticles(rssFeed);
                    var articleCount = (feeds.FeedArticleCount > articleList.Count) ? articleList.Count : feeds.FeedArticleCount;
                    feed.FeedArticles = GetFilteredArticles(articleList, feeds.FeedArticleOffset, articleCount);                      
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
                    Id = new Guid(),
                    FeedName = "All Feeds"
                };

                var articleList = new List<Models.Article>();
                foreach (var feedItem in feeds.FeedList)
                {
                    var decodedFeedRssUrl = WebUtility.UrlDecode(feedItem.FeedRssUrl);
                    var rssFeed = await GetRssFeed(decodedFeedRssUrl).ConfigureAwait(false);
                    var feedArticles = GetArticles(rssFeed);
                    articleList.AddRange(feedArticles);
                }

                allFeed.FeedArticles = GetFilteredArticles(articleList, feeds.FeedArticleOffset, feeds.FeedArticleCount);

                return allFeed;
            }
            catch(Exception ex) 
            {
                return GetFeedWithError(allFeed, ex);
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

        private List<Models.Article> GetArticles(CodeHollow.FeedReader.Feed rssFeed)
        {
            var articleList = new List<Models.Article>();
            foreach (var rssArticle in rssFeed.Items)
            {
                var article = new Models.Article()
                {
                    Id = Guid.NewGuid(),
                    ArticleId = rssArticle.Id,
                    ArticleUrl = rssArticle.Link,
                    ArticleAuthor = rssArticle.Author,
                    ArticlePublishingDate = rssArticle.PublishingDate,
                    ArticleDescription = rssArticle.Description,
                    ArticleTitle = rssArticle.Title,
                    ArticleContent = rssArticle.Content
                };

                article.ArticleEnclosureUrl = GetArticleEnclosureUrl(rssArticle, rssFeed.Type);

                articleList.Add(article);
            }
            return articleList;
        }

        private List<Models.Article> GetFilteredArticles(List<Models.Article> articles, int articleOffset, int articleCount)
        {
            //Order list of articles by publish date, filter list by articleOffset and articleCount
            var orderedArticles = articles.OrderByDescending(a => a.ArticlePublishingDate).ToList();            
            var filteredArticles = orderedArticles.GetRange(articleOffset, articleCount);

            return filteredArticles;
        }

        private string GetArticleEnclosureUrl(CodeHollow.FeedReader.FeedItem rssArticle, CodeHollow.FeedReader.FeedType feedType)
        {
            var enclosureUrl = string.Empty;

            if (feedType == FeedType.MediaRss)
            {
                var item = (CodeHollow.FeedReader.Feeds.MediaRssFeedItem)rssArticle.SpecificItem;
                enclosureUrl = item.Enclosure.Url;
            }
            else if (feedType == FeedType.MediaRss)
            {
                var item = (CodeHollow.FeedReader.Feeds.Rss20FeedItem)rssArticle.SpecificItem;
                enclosureUrl = item.Enclosure.Url;
            }

            return enclosureUrl;
        }

        // private async Task<byte[]> GetImageData(string imageUrl)
        // {
        //     HttpResponseMessage response = await _client.GetAsync(imageUrl);
        //     response.EnsureSuccessStatusCode();
        //     var imageBytes = await response.Content.ReadAsByteArrayAsync();

        //     return imageBytes;
        // }

        // private string GetImageFileType(string imageUrl)
        // {
        //     var type = Path.GetExtension(imageUrl);

        //     if (type.Length > 0) {
        //         return type;
        //     }
        //     else {
        //         return null;
        //     }
        // }

        #endregion
    }
}