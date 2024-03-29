using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

using Models.Reader;

namespace Reader
{
    public class UtilitiesService : IUtilitiesService
    {
        private IHttpClientFactory _clientFactory;
        public UtilitiesService(IHttpClientFactory clientFactory) {
            _clientFactory = clientFactory;
        }

        public async Task<string> GetRedirectedUrl(string url)
        {            
            var resolvedUrl = url;

            var client = _clientFactory.CreateClient();
            var clientHandler = new HttpClientHandler() {
                AllowAutoRedirect = true,
                MaxAutomaticRedirections = 3
            };
            
            var response = await client.GetAsync(url);
            var finalUrl = response.RequestMessage.RequestUri.ToString();
            if (!string.IsNullOrEmpty(finalUrl))
                resolvedUrl = finalUrl;

            return resolvedUrl.ToString();
        }

        public async Task<RemoteConnection> GetConnectionDetails(RemoteConnection connection)
        {
            var client = _clientFactory.CreateClient();            
            using var response = await client.GetAsync(connection.OriginalUrl, HttpCompletionOption.ResponseHeadersRead);
            if (response.IsSuccessStatusCode)
            {
                //Check for header x-frame-options
                IEnumerable<string> xFrameOptionValue;
                var xFrameOptionsExists = response.Headers.TryGetValues("X-Frame-Options", out xFrameOptionValue);
                connection.ShowUrlInIframe = (xFrameOptionsExists) ? false : true;
            }

            return connection;
        }
    }
}