using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppDrive.API.Entities
{
    public partial class Account
    {
        public Account()
        {
            Categories = new HashSet<Category>();
            Folders = new HashSet<Folder>();
            Images = new HashSet<Image>();
            RefreshTokens = new List<RefreshToken>();
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? Email { get; set; }
        public string? PasswordHash { get; set; }
        public bool AcceptTerms { get; set; }
        public Role Role { get; set; }
        public string? VerificationToken { get; set; }
        public DateTime? Verified { get; set; }
        public bool IsVerified => Verified.HasValue || PasswordReset.HasValue;
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpires { get; set; }
        public DateTime? PasswordReset { get; set; }
        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
        public string ExternalId { get; set; }
        public string ExternalType { get; set; }

        public virtual ICollection<Category> Categories { get; set; }
        public virtual ICollection<Folder> Folders { get; set; }
        public virtual ICollection<Image> Images { get; set; }
        public virtual List<RefreshToken>? RefreshTokens { get; set; }

        public bool OwnsToken(string token)
        {
            return this.RefreshTokens?.Find(x => x.Token == token) != null;
        }
    }
}
