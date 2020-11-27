using System;
using System.Collections.Generic;

namespace RssMedia.Models
{
    public class Article
    {
        public Guid Id {get; set;}
        public string ArticleId {get; set;}
        public string ArticleUrl { get; set; }
        public DateTime? ArticlePublishingDate { get; set; }
        public string ArticleAuthor {get; set;}
        public string ArticleTitle {get; set;}
        public string ArticleFullTitle {get; set;}
        public string ArticleDescription { get; set; }
        public string ArticleContent {get; set;}
        public string ArticleEnclosureUrl {get; set;}
        public string ArticleImageUrl {get; set;}
    }
}