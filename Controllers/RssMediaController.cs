using System;
using System.Collections.Generic;
using System.Linq;
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
        public RssMediaController(ILogger<RssMediaController> logger) 
        {
            _logger = logger;
        }

        [HttpPost]
        [ActionName("FeedLinks")]
        public async Task<IEnumerable<Models.FeedLink>> FeedLinks([FromBody]Models.FeedLink feedLink)
        {            
            try
            {
                var feedLinkList = new List<Models.FeedLink>();

                var urlList = await FeedReader.GetFeedUrlsFromUrlAsync(feedLink.BaseUrl).ConfigureAwait(false);
                foreach (var link in urlList)
                {
                    feedLinkList.Add(new FeedLink() {
                        Title = link.Title,
                        Url = link.Url,
                        BaseUrl = feedLink.BaseUrl
                    });
                }

                return feedLinkList;
            }
            catch(Exception)
            {
                return null;
            }
        }

        [HttpPost]
        [ActionName("Feed")]
        public async Task<Models.Feed> Feed([FromBody]Models.Feeds feeds)
        {           
            var feed = feeds.FeedList.First();

            try
            {                
                var rssFeed = await GetRssFeed(feed.FeedRssUrl).ConfigureAwait(false);
                feed = new Models.Feed() 
                {
                    Id = new Guid(),
                    FeedName = feed.FeedName,
                    FeedRssUrl = rssFeed.Link,
                    FeedImageUrl = rssFeed.ImageUrl
                };

                var articleList = GetArticles(rssFeed.Items);
                feed.FeedArticles = GetFilteredArticles(articleList, feeds.FeedArticleOffset, feeds.FeedArticleCount);

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
                    var rssFeed = await GetRssFeed(feedItem.FeedRssUrl).ConfigureAwait(false);
                    var feedArticles = GetArticles(rssFeed.Items);
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
            var readerTask = FeedReader.ReadAsync(url);
            await readerTask.ConfigureAwait(false);
            return readerTask.Result;
        }

        private List<Models.Article> GetArticles(ICollection<CodeHollow.FeedReader.FeedItem> rssArticles)
        {
            var articleList = new List<Models.Article>();
            foreach (var rssArticle in rssArticles)
            {
                articleList.Add(new Models.Article()
                {
                    Id = new Guid(),
                    ArticleId = rssArticle.Id,
                    ArticleUrl = rssArticle.Link,
                    ArticleAuthor = rssArticle.Author,
                    ArticlePublishingDate = rssArticle.PublishingDate,
                    ArticleDescription = rssArticle.Description,
                    ArticleTitle = rssArticle.Title,
                    ArticleContent = rssArticle.Content
                });              
            }
            return articleList;
        }

        private List<Models.Article> GetFilteredArticles(List<Models.Article> articles, int articleOffset, int articleCount)
        {
            //Order list of articles by publish date, filter list by articleOffset and articleCount
            var orderedArticles = articles.OrderByDescending(a => a.ArticlePublishingDate).ToList();
            var filteredArticles = orderedArticles.GetRange(articleOffset-1, articleCount);
            return filteredArticles;
        }

        #endregion
    }
}