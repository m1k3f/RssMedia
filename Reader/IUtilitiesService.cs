using System;
using System.Text;
using System.Threading.Tasks;

namespace Reader
{
    public interface IUtilitiesService
    {
        public Task<string> GetRedirectedUrl(string url);
    }
}