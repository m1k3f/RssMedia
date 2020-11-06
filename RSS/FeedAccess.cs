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
            _decodedUrl = WebUtility.UrlDecode(feedLink.AddUrl);            
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
            //var urlList = await FeedReader.GetFeedUrlsFromUrlAsync(_decodedUrl).ConfigureAwait(false);
            var urlList = await FeedReader.ParseFeedUrlsAsStringAsync(_decodedUrl);

            // foreach (var link in urlList)
            // {
            //     var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
            //     feedLinkList.Add(new Models.FeedLink() {
            //         Id = guidId,
            //         Title = link.Title,
            //         Url = WebUtility.UrlEncode(_decodedUrl),
            //         Name = _originalfeedLink.Name,
            //         AddUrl = _originalfeedLink.AddUrl
            //     });
            // }

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
            var response = await _client.GetAsync(_decodedUrl);
            var contentBytes = await response.Content.ReadAsByteArrayAsync();
            var contentString = Encoding.UTF8.GetString(contentBytes);

            // Regex rex = new Regex("<link.*rel=\"alternate\".*>");
            Regex rex = new Regex("<link(.*?)/>");
            var matches = rex.Matches(contentString);
            foreach (var match in matches)
            {
                var matchString = match.ToString();
                if (matchString.Contains("alternate") && 
                    matchString.Contains("rss"))
                {
                    var titleString = GetHtmlAttributeValueByName(matchString, "title");
                    var linkString = GetHtmlAttributeValueByName(matchString, "href");

                    // rex = new Regex("title=\"(.*?)\"");
                    // var title = rex.Matches(matchString).FirstOrDefault();
                    // var titleString = (title != null) ? title.Value.Replace("title=", "").Replace("\"", "") : "";
                    
                    // rex = new Regex("href=\"(.*?)\"");
                    // var link = rex.Matches(matchString).FirstOrDefault();
                    // var linkString = (link != null) ? link.Value.Replace("href=", "").Replace("\"", "") : null;

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

            return feedLinkList;
        }

        private string GetHtmlAttributeValueByName(string htmlTag, string attributeName)
        {
            var pattern = $"{attributeName}=\"(.*?)\"";
            var rex = new Regex(pattern);
            var match = rex.Matches(htmlTag).FirstOrDefault();
            var matchString = (match != null) ? match.Value.Replace($"{attributeName}=", "").Replace("\"", "") : "";
            
            return matchString;
        }

        #endregion

    }
}