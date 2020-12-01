using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace RssMedia.RSS
{
    public class FileDownload
    {
        
        public static async Task<FileStream> GetFeedFileStream(Models.Feeds feeds) 
        {
            var source = new CancellationTokenSource();
            var token = source.Token;

            var fileStream = new FileStream("Feeds.opml", FileMode.Create);            
            var xml = GetFeedsXml(feeds.FeedList);
            await xml.SaveAsync(fileStream, SaveOptions.None, token);
        
            return fileStream;
        }

        private static XDocument GetFeedsXml(IEnumerable<Models.Feed> feedList)
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
                                new XAttribute("xmlUrl", feed.FeedRssUrl));
                body.Add(outline);
            }

            rootNode.Add(head);
            rootNode.Add(body);
            xDocument.Add(rootNode);
            
            return xDocument;
        }
    }    
}