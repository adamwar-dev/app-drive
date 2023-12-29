using AppDrive.API.Models.Images;

namespace AppDrive.API.Models.Folders
{
    public class GetFolderResponse
    {
        public string FolderName { get; set; }
        public int Id { get; set; }
        public int ParentFolderId { get; set; }
        public ICollection<GetFolderResponse> InverseParentFolder { get; set; }
        public ICollection<GetImageResponse> Images { get; set; }
    }
}
