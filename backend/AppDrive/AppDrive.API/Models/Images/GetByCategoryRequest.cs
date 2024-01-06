namespace AppDrive.API.Models.Images
{
    public class GetByCategoryRequest
    {
        public string UserToken { get; set; }
        public int CategoryId { get; set; }
        public int FolderId { get; set; }
    }
}