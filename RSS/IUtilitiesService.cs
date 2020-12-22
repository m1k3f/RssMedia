using System;
using System.Text;
using System.Threading.Tasks;

namespace RssMedia.RSS
{
    public interface IUtilitiesService
    {
        public Task<string> GetRedirectedUrl(string url);
    }
}