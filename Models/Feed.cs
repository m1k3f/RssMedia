using System;
using System.Collections.Generic;

namespace RssMedia.Models
{
    public class Feed
    {
        public Guid Id {get; set;}
        public Guid FeedLinkId {get; set;}
        public string FeedName {get; set;}
        public string FeedTitle {get; set;}
        public string FeedRssUrl {get; set;}
        public string FeedImageUrl {get; set;}  
        public byte[] FeedImageBytes {get; set;}
        public string FeedImageFileType {get; set;}
        public IEnumerable<Article> FeedArticles {get; set;}        
        public FeedError FeedError {get; set;}
    }
}