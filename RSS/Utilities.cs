using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace RssMedia.RSS
{
    public class Utilities
    {
        public async static Task<string> GetRedirectedUrl(string url)
        {
            var resolvedUrl = url;
            var clientHandler = new HttpClientHandler() {
                AllowAutoRedirect = false
            };

            using (var client = new HttpClient(clientHandler, true))
            {
                var response = await client.GetAsync(url);
                var headerLocation = response.Headers.GetValues("Location").FirstOrDefault();
                if (!string.IsNullOrEmpty(headerLocation))
                    resolvedUrl = headerLocation;
            }

            return resolvedUrl.ToString();
        }
    }
}