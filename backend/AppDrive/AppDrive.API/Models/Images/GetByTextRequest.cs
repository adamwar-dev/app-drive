namespace AppDrive.API.Models.Images
{
    public class GetByTextRequest
    {
        public string UserToken { get; set; }
        public string Text { get; set; }
        public int FolderId { get; set; }
    }
}
