using System;
using System.Collections.Generic;
using System.Linq;
using System.Xml.Linq;

namespace Reader
{
    public class FeedData
    {

        private CodeHollow.FeedReader.Feed _rssFeed;
        private string _feedName;
        private XDocument _xmlDocument;
        private XNamespace _xmlMediaNamespace;
        public FeedData(CodeHollow.FeedReader.Feed rssFeed)
        {
            _rssFeed = rssFeed;
            _feedName = null;
        }
        public FeedData(CodeHollow.FeedReader.Feed rssFeed, string feedName)
        {
            _rssFeed = rssFeed;
            _feedName = feedName;
        }

        public List<Models.Reader.Article> GetArticles()
        {
            var articleList = new List<Models.Reader.Article>();
            foreach (var rssArticle in _rssFeed.Items)
            {
                var enclosureData = GetArticleEnclosure(rssArticle);

                var article = new Models.Reader.Article()
                {
                    Id = Guid.NewGuid(),
                    ArticleId = rssArticle.Id,
                    ArticleUrl = rssArticle.Link,
                    ArticleAuthor = rssArticle.Author,
                    ArticlePublishingDate = rssArticle.PublishingDate,
                    ArticleDescription = GetArticleDescription(rssArticle),
                    ArticleTitle = rssArticle.Title,                    
                    ArticleContent = rssArticle.Content,
                    ArticleEnclosureContentType = enclosureData.contentType,
                    ArticleEnclosureUrl = enclosureData.url,
                    ArticleImageUrl = GetArticleImageUrl(rssArticle)
                };

                if (!string.IsNullOrEmpty(_feedName))
                {
                    article.ArticleFullTitle = $"{_feedName}: {rssArticle.Title}";
                }

                articleList.Add(article);
            }
            return articleList;
        }

        public static List<Models.Reader.Article> GetFilteredArticles(List<Models.Reader.Article> articles, int articleOffset, int articleCount)
        {
            //Order list of articles by publish date, filter list by articleOffset and articleCount
            var orderedArticles = articles.OrderByDescending(a => a.ArticlePublishingDate).ToList();            
            var filteredArticles = orderedArticles.GetRange(articleOffset, articleCount);

            return filteredArticles;
        }

        #region Private Methods

        private void SetXmlDocumentData()
        {
            if (_xmlDocument == null)
            {
                _xmlDocument = XDocument.Parse(_rssFeed.OriginalDocument);                
            }
            
            if (_xmlMediaNamespace == null)
            {
                _xmlMediaNamespace = _xmlDocument.Root.GetNamespaceOfPrefix("media");
            }
        }

        private string GetArticleDescription(CodeHollow.FeedReader.FeedItem rssArticle)
        {
            var description = string.Empty;
            if (!string.IsNullOrEmpty(rssArticle.Description))
            {
                description = rssArticle.Description;
            }
            else 
            {
                SetXmlDocumentData();
                if (_xmlMediaNamespace != null)
                {
                    var articleXml = rssArticle.SpecificItem.Element;
                    var mediaDescriptionElementName = _xmlMediaNamespace + "description";
                    if (articleXml.Descendants().Any(x => x.Name.Equals(mediaDescriptionElementName)))
                    {
                        description = articleXml.Descendants()
                                                .First(x => x.Name.Equals(mediaDescriptionElementName))
                                                .Value;
                    }
                }
            }

            return description;
        }

        private Models.Reader.ArticleEnclosure GetArticleEnclosure(CodeHollow.FeedReader.FeedItem rssArticle)
        {
            var enclosure = new Models.Reader.ArticleEnclosure();

            if (_rssFeed.Type == CodeHollow.FeedReader.FeedType.MediaRss)
            {
                var item = (CodeHollow.FeedReader.Feeds.MediaRssFeedItem)rssArticle.SpecificItem;
                enclosure.contentType = item.Enclosure.MediaType;
                enclosure.url = item.Enclosure.Url;
            }
            else if (_rssFeed.Type == CodeHollow.FeedReader.FeedType.Rss_2_0)
            {
                var item = (CodeHollow.FeedReader.Feeds.Rss20FeedItem)rssArticle.SpecificItem;
                enclosure.contentType = item.Enclosure.MediaType;
                enclosure.url = item.Enclosure.Url;
            }

            return enclosure;
        }        

        private string GetArticleImageUrl(CodeHollow.FeedReader.FeedItem rssArticle)
        {
            string imageUrl = null;
            SetXmlDocumentData();
            if (_xmlMediaNamespace != null)
            {
                var articleXml = rssArticle.SpecificItem.Element;
                var mediaImageElementName = _xmlMediaNamespace + "thumbnail";
                if (articleXml.Descendants().Any(x => x.Name.Equals(mediaImageElementName)))
                {
                    imageUrl = articleXml.Descendants()
                                            .First(x => x.Name.Equals(mediaImageElementName))
                                            .Attribute("url").Value;
                }
            }

            return imageUrl;
        }

        #endregion
    }
}