namespace AppDrive.API.Models.Folders
{
    public class GetFolderRequest
    {
        public string UserToken { get; set; }
        public int FolderId { get; set; }
    }
}
