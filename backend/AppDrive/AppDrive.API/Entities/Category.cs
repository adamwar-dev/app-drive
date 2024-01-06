using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDrive.API.Entities
{
    public partial class Category
    {
        public Category()
        {
            ImageCategories = new HashSet<ImageCategory>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? CategoryName { get; set; }
        public int? AccountId { get; set; }
        public int? ImageId { get; set; }

        public virtual Account? Account { get; set; }
        public virtual ICollection<ImageCategory> ImageCategories { get; set; }
    }
}
