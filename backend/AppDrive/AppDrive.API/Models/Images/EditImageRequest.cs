namespace AppDrive.API.Models.Images
{
    public class EditImageRequest
    {
        public string UserToken { get; set; }
        public int Id { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public int? FolderId { get; set; }
        public int[]? Categories { get; set; }
        public DateTime? Date { get; set; }
    }
}
