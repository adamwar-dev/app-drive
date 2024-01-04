using AppDrive.API.Entities;
using Microsoft.EntityFrameworkCore;
namespace AppDrive.API.Helpers
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Account> Accounts { get; set; } = null!;
        public virtual DbSet<Category> Categories { get; set; } = null!;
        public virtual DbSet<Folder> Folders { get; set; } = null!;
        public virtual DbSet<Image> Images { get; set; } = null!;
        public virtual DbSet<ImageCategory> ImageCategories { get; set; } = null!;
        public virtual DbSet<RefreshToken> RefreshTokens { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=TAI_DB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Account>(entity =>
            {
                entity.ToTable("Account");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Created).HasColumnType("text");

                entity.Property(e => e.Email).HasColumnType("text");

                entity.Property(e => e.FirstName).HasColumnType("text");

                entity.Property(e => e.PasswordHash).HasColumnType("text");

                entity.Property(e => e.PasswordReset).HasColumnType("text");

                entity.Property(e => e.ResetToken).HasColumnType("text");

                entity.Property(e => e.ResetTokenExpires).HasColumnType("text");

                entity.Property(e => e.Updated).HasColumnType("text");

                entity.Property(e => e.VerificationToken).HasColumnType("text");

                entity.Property(e => e.Verified).HasColumnType("text");
            });

            modelBuilder.Entity<Category>(entity =>
            {
                entity.ToTable("Category");

                entity.Property(e => e.CategoryName).HasMaxLength(200);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Categories)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Category_Account");
            });

            modelBuilder.Entity<Folder>(entity =>
            {
                entity.ToTable("Folder");

                entity.Property(e => e.FolderDescription).HasColumnType("text");

                entity.Property(e => e.FolderName).HasColumnType("text");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Folders)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Folder_Account");

                entity.HasOne(d => d.ParentFolder)
                    .WithMany(p => p.InverseParentFolder)
                    .HasForeignKey(d => d.ParentFolderId)
                    .HasConstraintName("FK_Folder_ParentFolder")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<Image>(entity =>
            {
                entity.ToTable("Image");

                entity.Property(e => e.ImageDateOfCreate).HasColumnType("datetime");

                entity.Property(e => e.ImageDescription).HasMaxLength(200);

                entity.Property(e => e.ImageFormat).HasMaxLength(200);

                entity.Property(e => e.ImageTitle).HasMaxLength(200);

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.AccountId)
                    .HasConstraintName("FK_Image_Account");

                entity.HasOne(d => d.Folder)
                    .WithMany(p => p.Images)
                    .HasForeignKey(d => d.FolderId)
                    .HasConstraintName("FK_Image_Folder")
                    .OnDelete(DeleteBehavior.Cascade);
            });

            modelBuilder.Entity<ImageCategory>(entity =>
            {
                entity.ToTable("ImageCategory");

                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.Category)
                    .WithMany(p => p.ImageCategories)
                    .HasForeignKey(d => d.CategoryId)
                    .HasConstraintName("FK_ImageCategory_Category");

                entity.HasOne(d => d.Image)
                    .WithMany(p => p.ImageCategories)
                    .HasForeignKey(d => d.ImageId)
                    .HasConstraintName("FK_ImageCategory_Image");
            });

            modelBuilder.Entity<RefreshToken>(entity =>
            {
                entity.ToTable("RefreshToken");

                entity.Property(e => e.Created).HasColumnType("text");

                entity.Property(e => e.CreatedByIp).HasColumnType("text");

                entity.Property(e => e.Expires).HasColumnType("text");

                entity.Property(e => e.ReasonRevoked).HasColumnType("text");

                entity.Property(e => e.ReplacedByToken).HasColumnType("text");

                entity.Property(e => e.Revoked).HasColumnType("text");

                entity.Property(e => e.RevokedByIp).HasColumnType("text");

                entity.Property(e => e.Token).HasColumnType("text");

                entity.HasOne(d => d.Account)
                    .WithMany(p => p.RefreshTokens)
                    .HasForeignKey(d => d.AccountId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__RefreshTo__Accou__2645B050");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
