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
                AllowAutoRedirect = true,
                MaxAutomaticRedirections = 3
            };

            using (var client = new HttpClient(clientHandler, true))
            {
                var response = await client.GetAsync(url);
                var finalUrl = response.RequestMessage.RequestUri.ToString();
                if (!string.IsNullOrEmpty(finalUrl))
                    resolvedUrl = finalUrl;
            }

            return resolvedUrl.ToString();
        }
    }
}