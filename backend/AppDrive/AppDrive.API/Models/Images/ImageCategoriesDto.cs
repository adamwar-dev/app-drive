namespace AppDrive.API.Models.Images
{
    public class ImageCategoriesDto
    {
        public int Id { get; set; }
        public int? ImageId { get; set; }
        public int? CategoryId { get; set; }
        public string CategoryName { get; set; }
    }
}
