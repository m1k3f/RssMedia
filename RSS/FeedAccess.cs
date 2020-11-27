using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeHollow.FeedReader;

namespace RssMedia.RSS
{
    public class FeedAccess
    {
        private HttpClient _client;
        private Models.FeedLink _originalfeedLink;
        private string _decodedUrl;
        public FeedAccess(Models.FeedLink feedLink)
        {
            _client = new HttpClient();
            _originalfeedLink = feedLink;

            _decodedUrl = GetValidUrl(WebUtility.UrlDecode(feedLink.AddUrl));
        }

        public async Task<IEnumerable<Models.FeedLink>> GetFeedLinkList()
        {
            //var feedsByUrl = await GetFeedsFromPageUrl();
            var feedsByUrl = await GetFeedsFromPageUrlManual();
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
                    return new List<Models.FeedLink>();
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

        // private async Task<IEnumerable<Models.FeedLink>> GetFeedsFromPageUrl()
        // {
        //     var feedLinkList = new List<Models.FeedLink>();
        //     //var urlList = await FeedReader.GetFeedUrlsFromUrlAsync(_decodedUrl).ConfigureAwait(false);
        //     var urlList = await FeedReader.ParseFeedUrlsAsStringAsync(_decodedUrl);

        //     foreach (var link in urlList)
        //     {
        //         var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
        //         feedLinkList.Add(new Models.FeedLink() {
        //             Id = guidId,
        //             Title = link.Title,
        //             Url = WebUtility.UrlEncode(_decodedUrl),
        //             Name = _originalfeedLink.Name,
        //             AddUrl = _originalfeedLink.AddUrl
        //         });
        //     }

        //     return feedLinkList;
        // }

        private async Task<IEnumerable<Models.FeedLink>> GetFeedFromFeedUrl()
        {
            var feedLinkList = new List<Models.FeedLink>();

            if (_decodedUrl != null)
            {
                //var rssFeed = await FeedReader.ReadAsync(_decodedUrl);
                var rssFeed = await GetFeedReaderFeed();
                
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
            }

            return feedLinkList;
        }

        private async Task<CodeHollow.FeedReader.Feed> GetFeedReaderFeed()
        {
            CodeHollow.FeedReader.Feed feed;
            try
            {
                feed = await FeedReader.ReadAsync(_decodedUrl);
            }
            catch(Exception)
            {
                feed = null;
            }

            return feed;
        }

        // private IEnumerable<Models.FeedLink> GetFeedFromUrl()
        // {
        //     var feedLinkList = new List<Models.FeedLink>();
        //     var reader = new SimpleFeedReader.FeedReader();
        //     var items = reader.RetrieveFeed(_decodedUrl);
        //     if (items != null && items.Count() > 0)
        //     {
        //         var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
        //         feedLinkList.Add(new Models.FeedLink() {
        //             Id = guidId,
        //             Title = rssFeed.Title,
        //             Url = WebUtility.UrlEncode(_decodedUrl),
        //             Name = _originalfeedLink.Name,
        //             AddUrl = _originalfeedLink.AddUrl
        //         });
        //     }
        // }

        // private async Task<IEnumerable<Models.FeedLink>> GetFeedsFromPageUrlManual()
        // {
        //     var feedLinkList = new List<Models.FeedLink>();

        //     //Do a manual search through page to find feed(s)
        //     var web = new HtmlAgilityPack.HtmlWeb();
        //     var pageDoc = await web.LoadFromWebAsync(_decodedUrl);
        //     var rssFeedXpath = "//link[(@type='application/rss+xml' or @type='application/atom+xml') and @rel='alternate']";
        //     var rssFeeds = pageDoc.DocumentNode.SelectNodes(rssFeedXpath);

        //     if (rssFeeds != null)
        //     {
        //         foreach (var feed in rssFeeds)
        //         {
        //             var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
        //             feedLinkList.Add(new Models.FeedLink() {
        //                 Id = guidId,
        //                 Title = feed.Attributes["title"].Value,
        //                 Url = WebUtility.UrlEncode(feed.Attributes["href"].Value),
        //                 Name = _originalfeedLink.Name,
        //                 AddUrl = _originalfeedLink.AddUrl
        //             });
        //         }
        //     }

        //     return feedLinkList;
        // }

        private async Task<IEnumerable<Models.FeedLink>> GetFeedsFromPageUrlManual()
        {
            var feedLinkList = new List<Models.FeedLink>();

            //TODO: don't get source as string; use stream instead
            var contentString = await GetPageSource(_decodedUrl);

            // Regex rex = new Regex("<link.*rel=\"alternate\".*>");
            Regex rex = new Regex("<link[^>]*>");
            var matches = rex.Matches(contentString);
            foreach (var match in matches)
            {
                var matchString = match.ToString();
                if (FeedValidator.FeedExists(matchString))
                {
                    var titleString = GetHtmlAttributeValueByName(matchString, "title");
                    var linkString = GetHtmlAttributeValueByName(matchString, "href");
                    linkString = GetValidUrl(linkString);

                    if (linkString != null)
                    {
                        var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
                        feedLinkList.Add(new Models.FeedLink() {
                            Id = guidId,
                            Title = titleString,
                            Url = WebUtility.UrlEncode(linkString),
                            Name = _originalfeedLink.Name,
                            AddUrl = _originalfeedLink.AddUrl
                        });
                    }
                }
            }

            return feedLinkList;
        }

        private async Task<string> GetPageSource(string url)
        {
            var contentString = string.Empty;

            if (!string.IsNullOrEmpty(url))
            {
                var response = await _client.GetAsync(url);
                var contentBytes = await response.Content.ReadAsByteArrayAsync();
                contentString = Encoding.UTF8.GetString(contentBytes);
            }

            return contentString;
        }

        private string GetHtmlAttributeValueByName(string htmlTag, string attributeName)
        {
            var pattern = $"{attributeName}=\"(.*?)\"";
            var rex = new Regex(pattern);
            var match = rex.Matches(htmlTag).FirstOrDefault();
            var matchString = (match != null) ? match.Value.Replace($"{attributeName}=", "").Replace("\"", "") : "";
            
            return matchString;
        }        

        private string GetValidUrl(string url) 
        {
            string validUrl = url;
            if (url.StartsWith('/'))
            {
                //feed url has relative path; make it absolute
                validUrl = $"{_decodedUrl}{url}";
            }

            validUrl = GetValidUrlScheme(validUrl);            

            if (!Uri.IsWellFormedUriString(validUrl, UriKind.Absolute))
            {
                validUrl = null;
            }

            return validUrl;
        }

        private string GetValidUrlScheme(string url)
        {
            var validUrl = url;

            if (!url.Contains("http://") && !url.Contains("https://"))
            {
                validUrl = $"https://{url}";
            }

            return validUrl;
        }

        #endregion

    }
}