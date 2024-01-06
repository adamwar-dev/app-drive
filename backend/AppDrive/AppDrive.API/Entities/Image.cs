using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDrive.API.Entities
{
    public partial class Image
    {
        public Image()
        {
            ImageCategories = new HashSet<ImageCategory>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? ImageTitle { get; set; }
        public byte[] ImageData { get; set; } = null!;
        public string? ImageDescription { get; set; }
        public int? ImageSize { get; set; }
        public string? ImageFormat { get; set; }
        public DateTime? ImageDateOfCreate { get; set; }
        public int? AccountId { get; set; }
        public int? FolderId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual Folder? Folder { get; set; }
        public virtual ICollection<ImageCategory> ImageCategories { get; set; }
    }
}
