namespace AppDrive.API.Models.Images
{
    public class GetByDateRequest
    {
        public string UserToken { get; set; }
        public bool IsLastest { get; set; }
        public int FolderId { get; set; }
    }
}
