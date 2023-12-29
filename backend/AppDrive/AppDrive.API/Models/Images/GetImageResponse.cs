namespace AppDrive.API.Models.Images
{
    public class GetImageResponse
    {
        public byte[] ImageData { get; set; }
        public int Id { get; set; }
        public string ImageTitle { get; set; }
        public string ImageDescription { get; set; }
        public int FolderId { get; set; }
        public DateTime ImageDateOfCreate { get; set; }
        public ICollection<ImageCategoriesDto> ImageCategories { get; set; }
    }
}
