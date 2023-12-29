namespace AppDrive.API.Models.Folders
{
    public class AddFolderRequest
    {
        public string UserToken { get; set; }
        public string FolderName { get; set; }
        public int? ParentFolderId { get; set; }
    }
}
