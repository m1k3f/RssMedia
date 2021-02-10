using System;
using System.Collections.Generic;

namespace RssMedia.Models.Reader
{
    public class Feeds
    {
        public IEnumerable<Feed> FeedList {get; set;}
        public int FeedArticleOffset {get; set;}
        public int FeedArticleCount {get; set;}        
    }
}