using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Reader
{
    public class FileDownload
    {
        
        public static Stream GetFeedFileStream(Models.Reader.Feeds feeds) 
        {
            var xmlDoc = GetFeedsXml(feeds.FeedList);
            var xmlFullDocument = string.Concat(xmlDoc.Declaration.ToString(), "\r\n", xmlDoc.ToString());
            var feedBytes = Encoding.UTF8.GetBytes(xmlFullDocument);
            var dataStream = new MemoryStream(feedBytes);
        
            return dataStream;
        }

        private static XDocument GetFeedsXml(IEnumerable<Models.Reader.Feed> feedList)
        {
            var xDocument = new XDocument(
                                new XDeclaration("1.0", "UTF-8", null));
            
            var rootNode = new XElement("opml", new XAttribute("version", "2.0"));

            var head = new XElement("head", 
                            new XElement("title", "FeedReader"),
                            new XElement("dateModified", DateTime.Now.ToString()));        

            var body = new XElement("body");
            foreach(var feed in feedList)
            {
                var outline = new XElement("outline", 
                                new XAttribute("text", feed.FeedName), 
                                new XAttribute("type", "rss"), 
                                new XAttribute("htmlUrl", ""),
                                new XAttribute("xmlUrl", WebUtility.UrlDecode(feed.FeedRssUrl)));
                body.Add(outline);
            }

            rootNode.Add(head);
            rootNode.Add(body);
            xDocument.Add(rootNode);
            
            return xDocument;
        }
    }    
}