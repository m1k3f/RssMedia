using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RssMedia.Reader
{
    public class FeedValidator
    {
        public static bool FeedExists(string htmlLinkElement)
        {
            if (RssFeedExists(htmlLinkElement))
            {
                return true;
            }
            else if (AtomFeedExists(htmlLinkElement))
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        #region Private Methods

        private static bool RssFeedExists(string htmlLinkElement)
        {
            var exists = false;
            if (htmlLinkElement.Contains("alternate") && htmlLinkElement.Contains("rss"))
            {
                exists = true;
            }

            return exists;
        }

        private static bool AtomFeedExists(string htmlLinkElement)
        {
            var exists = false;
            if (htmlLinkElement.Contains("alternate") && htmlLinkElement.Contains("atom"))
            {
                exists = true;
            }

            return exists;
        }

        #endregion
    }
}