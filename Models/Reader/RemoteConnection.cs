namespace Models.Reader
{
    public class RemoteConnection
    {
        public string OriginalUrl {get; set;}
        public string[] Headers {get; set;}
        public bool ShowUrlInIframe {get; set;}
    }
}