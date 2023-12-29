namespace AppDrive.API.Models.Folders
{
    public class FolderStatsResponse
    {
        public int ImageCount { get; set; }
        public IEnumerable<ImageCategoryStatsResponse> ImageCategories { get; set; }
    }
}
