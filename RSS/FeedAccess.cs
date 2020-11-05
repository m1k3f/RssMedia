using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using CodeHollow.FeedReader;

namespace RssMedia.RSS
{
    public class FeedAccess
    {
        private Models.FeedLink _originalfeedLink;
        private string _decodedUrl;
        public FeedAccess(Models.FeedLink feedLink)
        {
            _originalfeedLink = feedLink;
            _decodedUrl = WebUtility.UrlDecode(feedLink.AddUrl);
        }

        public async Task<IEnumerable<Models.FeedLink>> GetFeedLinkList()
        {
            var feedsByUrl = await GetFeedsFromPageUrl();
            //var feedsByUrl = await GetFeedsFromPageUrlManual();
            if (feedsByUrl.Count() > 0)
            {
                return feedsByUrl;
            }
            else
            {
                var feedByFeedUrl = await GetFeedFromFeedUrl();
                if (feedByFeedUrl.Count() > 0 )
                {
                    return feedByFeedUrl;
                }
                else
                {
                    return null;
                }
                // else
                // {
                //     var feedsByUrlManual = await GetFeedsFromPageUrlManual();
                //     if (feedsByUrlManual.Count() > 0)
                //     {
                //         return feedsByUrlManual;
                //     }
                //     else
                //     {
                //         return null;
                //     }
                // }
            }
        }

        #region Private Methods

        private async Task<IEnumerable<Models.FeedLink>> GetFeedsFromPageUrl()
        {
            var feedLinkList = new List<Models.FeedLink>();
            var urlList = await FeedReader.GetFeedUrlsFromUrlAsync(_decodedUrl).ConfigureAwait(false);

            foreach (var link in urlList)
            {
                var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
                feedLinkList.Add(new Models.FeedLink() {
                    Id = guidId,
                    Title = link.Title,
                    Url = WebUtility.UrlEncode(_decodedUrl),
                    Name = _originalfeedLink.Name,
                    AddUrl = _originalfeedLink.AddUrl
                });
            }

            return feedLinkList;
        }

        private async Task<IEnumerable<Models.FeedLink>> GetFeedFromFeedUrl()
        {
            var feedLinkList = new List<Models.FeedLink>();
            var rssFeed = await FeedReader.ReadAsync(_decodedUrl);
            if (rssFeed != null)
            {
                var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
                feedLinkList.Add(new Models.FeedLink() {
                    Id = guidId,
                    Title = rssFeed.Title,
                    Url = WebUtility.UrlEncode(_decodedUrl),
                    Name = _originalfeedLink.Name,
                    AddUrl = _originalfeedLink.AddUrl
                });
            }

            return feedLinkList;
        }

        private async Task<IEnumerable<Models.FeedLink>> GetFeedsFromPageUrlManual()
        {
            var feedLinkList = new List<Models.FeedLink>();

            //Do a manual search through page to find feed(s)
            var web = new HtmlAgilityPack.HtmlWeb();
            var pageDoc = await web.LoadFromWebAsync(_decodedUrl);
            var rssFeedXpath = "//link[(@type='application/rss+xml' or @type='application/atom+xml') and @rel='alternate']";
            var rssFeeds = pageDoc.DocumentNode.SelectNodes(rssFeedXpath);

            if (rssFeeds != null)
            {
                foreach (var feed in rssFeeds)
                {
                    var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
                    feedLinkList.Add(new Models.FeedLink() {
                        Id = guidId,
                        Title = feed.Attributes["title"].Value,
                        Url = WebUtility.UrlEncode(feed.Attributes["href"].Value),
                        Name = _originalfeedLink.Name,
                        AddUrl = _originalfeedLink.AddUrl
                    });
                }
            }

            return feedLinkList;
        }

        #endregion

    }
}