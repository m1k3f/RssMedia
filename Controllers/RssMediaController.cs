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
    [Route("[controller]")]
    public class RssMediaController : ControllerBase {
        public RssMediaController() {

        }

        [HttpGet]
        public async Task<IEnumerable<HtmlFeedLink>> GetFeedUrlList(string url)
        {
            try
            {
                //Get feed urls
                var feedUrlList = await FeedReader.GetFeedUrlsFromUrlAsync(url).ConfigureAwait(false);
                return feedUrlList;
            }
            catch(Exception)
            {
                return null;
            }
        }

        [HttpGet]
        public async Task<Models.Feed> GetNewFeed(string feedName, string feedRssUrl)
        {
            Models.Feed feed = null;

            try
            {
                var rssFeed = await GetRssFeed(feedRssUrl).ConfigureAwait(false);
                feed = new Models.Feed() 
                {
                    Id = new Guid(),
                    FeedName = feedName,
                    FeedRssUrl = rssFeed.Link,
                    FeedImageUrl = rssFeed.ImageUrl,
                    FeedArticles = GetArticles(rssFeed.Items)
                };
                return feed;
            }
            catch(Exception ex)
            {
                feed.FeedArticles = null;
                feed.FeedError = new FeedError()
                {
                    ErrorMessage = ex.Message,
                    StackTrace = ex.StackTrace
                };
                return feed;
            }
        }

        [HttpGet]
        public async Task<Models.Feed> GetUpdatedFeedArticles(Models.Feed feed)
        {
            try
            {
                var rssFeed = await GetRssFeed(feed.FeedRssUrl).ConfigureAwait(false);
                feed.FeedArticles = GetArticles(rssFeed.Items);
                return feed;
            }
            catch(Exception ex)
            {
                feed.FeedArticles = null;
                feed.FeedError = new FeedError()
                {
                    ErrorMessage = ex.Message,
                    StackTrace = ex.StackTrace
                };
                return feed;
            }
        }

        private async Task<CodeHollow.FeedReader.Feed> GetRssFeed(string url)
        {
            var readerTask = FeedReader.ReadAsync(url);
            await readerTask.ConfigureAwait(false);
            return readerTask.Result;
        }

        private IEnumerable<Article> GetArticles(ICollection<CodeHollow.FeedReader.FeedItem> rssArticles)
        {
            var articleList = new List<Article>();
            foreach (var rssArticle in rssArticles)
            {
                var article = new Article()
                {
                    Id = new Guid(),
                    ArticleId = rssArticle.Id,
                    ArticleUrl = rssArticle.Link,
                    ArticleAuthor = rssArticle.Author,
                    ArticlePublishingDate = rssArticle.PublishingDate,
                    ArticleDescription = rssArticle.Description,
                    ArticleTitle = rssArticle.Title,
                    ArticleContent = rssArticle.Content
                };
                articleList.Add(article);                
            }
            return articleList;
        }
    }
}