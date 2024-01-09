namespace AppDrive.API.Models.Images
{
    public class AddImageRequest
    {
        public string UserToken { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int FolderId { get; set; }
        public DateTime? Date { get; set; }
        public int[] Categories { get; set; }
        public IEnumerable<byte[]> Images { get; set; }
    }
}
