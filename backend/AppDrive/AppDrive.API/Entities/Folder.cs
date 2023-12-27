using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDrive.API.Entities
{
    public partial class Folder
    {
        public Folder()
        {
            Images = new HashSet<Image>();
            InverseParentFolder = new HashSet<Folder>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string FolderName { get; set; } = null!;
        public string? FolderDescription { get; set; }
        public int? ParentFolderId { get; set; }
        public int? AccountId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Folder? ParentFolder { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual ICollection<Folder> InverseParentFolder { get; set; }
    }
}
