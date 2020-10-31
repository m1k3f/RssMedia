using System;
using System.Collections.Generic;

namespace RssMedia.Models
{
    public class FeedLink {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public string Url { get; set; }
        public string Name {get; set; }
        public string BaseUrl {get; set;}
        public string AddUrl {get; set;}
    }
}