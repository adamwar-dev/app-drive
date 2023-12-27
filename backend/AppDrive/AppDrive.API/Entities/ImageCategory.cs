using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDrive.API.Entities
{
    public partial class ImageCategory
    {
        public ImageCategory() { }
        public ImageCategory(int? imageId, int? categoryId, Category? category, Image? image)
        {
            ImageId = imageId;
            CategoryId = categoryId;
            Category = category;
            Image = image;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int? ImageId { get; set; }
        public int? CategoryId { get; set; }

        public virtual Category? Category { get; set; }
        public virtual Image? Image { get; set; }
    }
}
