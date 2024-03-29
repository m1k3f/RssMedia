using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using CodeHollow.FeedReader;

namespace Reader
{
    public class FeedAccess
    {
        private IHttpClientFactory _clientFactory;
        private Models.Reader.FeedLink _originalfeedLink;
        private string _decodedUrl;
        public FeedAccess(IHttpClientFactory clientFactory, Models.Reader.FeedLink feedLink)
        {
            _clientFactory = clientFactory;
            _originalfeedLink = feedLink;

            _decodedUrl = GetValidUrl(WebUtility.UrlDecode(feedLink.AddUrl));
        }

        public async Task<IEnumerable<Models.Reader.FeedLink>> GetFeedLinkList()
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
                    return new List<Models.Reader.FeedLink>();
                }
            }
        }        

        public async Task<IEnumerable<Models.Reader.FeedLink>> GetFeedFromFeedUrl()
        {
            var feedLinkList = new List<Models.Reader.FeedLink>();

            if (_decodedUrl != null)
            {
                var rssFeed = await GetFeedReaderFeed();
                
                if (rssFeed != null)
                {
                    var guidId = (_originalfeedLink.Id == null || _originalfeedLink.Id == Guid.Empty) ? Guid.NewGuid() : _originalfeedLink.Id;
                    feedLinkList.Add(new Models.Reader.FeedLink() {
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

        #region Private Methods

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

        private async Task<IEnumerable<Models.Reader.FeedLink>> GetFeedsFromPageUrlManual()
        {
            var feedLinkList = new List<Models.Reader.FeedLink>();

            //TODO: don't get source as string; use stream instead
            var contentString = await GetPageSource(_decodedUrl);

            if (!string.IsNullOrEmpty(contentString))
            {
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
                            feedLinkList.Add(new Models.Reader.FeedLink() {
                                Id = guidId,
                                Title = titleString,
                                Url = WebUtility.UrlEncode(linkString),
                                Name = _originalfeedLink.Name,
                                AddUrl = _originalfeedLink.AddUrl
                            });
                        }
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
                var client = _clientFactory.CreateClient();
                HttpResponseMessage response = null;
                var retry = false;
                for(var i=0; i < 2; i++)
                {
                    try
                    {
                        if (!retry)
                        {
                            response = await client.GetAsync(url);
                        }
                        else if (retry && url.StartsWith("https://"))
                        {
                            var newUrl = url.Replace("https://", "http://");
                            response = await client.GetAsync(newUrl);
                        }
                    }
                    catch(HttpRequestException)
                    {
                        retry = true;
                        continue;
                    }

                    var contentBytes = await response.Content.ReadAsByteArrayAsync();
                    contentString = Encoding.UTF8.GetString(contentBytes);
                }
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