using AppDrive.API.Authorization;
using AppDrive.API.Entities;
using AppDrive.API.Helpers;
using AppDrive.API.Models.Images;
using AutoMapper;
using Microsoft.AspNetCore.Http;

namespace AppDrive.API.Services
{
    public interface IImageService
    {
        public IEnumerable<Image> AddImages(AddImageRequest request);
        public Image DeleteImage(DeleteImageRequest request);
        public GetImageResponse GetImage(GetImageRequest request);
        public Image EditImage(EditImageRequest request);
        public IEnumerable<GetImageResponse> GetByCategory(GetByCategoryRequest request);
        public IEnumerable<GetImageResponse> GetByName(GetByTextRequest request);
        public IEnumerable<GetImageResponse> GetByDate(GetByDateRequest request);
    }

    public class ImageService : IImageService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly ICategoryService _categoryService;
        private readonly IJwtUtils _jwtUtils;

        public ImageService(DataContext context, IMapper mapper, ICategoryService categoryService, IJwtUtils jwtUtils)
        {
            _context = context;
            _mapper = mapper;
            _categoryService = categoryService;
            _jwtUtils = jwtUtils;
        }

        public IEnumerable<Image> AddImages(AddImageRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            if (accountId == null)
            {
                return null;
            }

            List<Image> newImages = new List<Image>();
            foreach (var image in request.Images)
            {

                var newImage = new Image();
                newImage.AccountId = accountId;
                newImage.ImageTitle = request.Title;
                newImage.ImageDescription = request.Description;
                newImage.ImageData = image;
                newImage.FolderId = request.FolderId;
                if (request.Date == null)
                {
                    newImage.ImageDateOfCreate = getImageDateTime(image);
                }
                else
                {
                    newImage.ImageDateOfCreate = request.Date;
                }
                _context.Images.Add(newImage);
                _context.SaveChanges();

                var imageId = newImage.Id;
                foreach (var category in request.Categories)
                {
                    ImageCategory imageCategory = new ImageCategory();
                    imageCategory.ImageId = imageId;
                    imageCategory.CategoryId = category;
                    _context.ImageCategories.Add(imageCategory);
                }
                _context.SaveChanges();
                newImages.Add(newImage);
            }
            IEnumerable<Image> response = newImages;
            return response;
        }

        DateTime getImageDateTime(byte[] imageBytes)
        {
            try
            {
                using (MemoryStream memoryStream = new MemoryStream(imageBytes))
                {
                    SixLabors.ImageSharp.Image<SixLabors.ImageSharp.PixelFormats.Rgba32> image = SixLabors.ImageSharp.Image.Load<SixLabors.ImageSharp.PixelFormats.Rgba32>(memoryStream);
                    SixLabors.ImageSharp.Metadata.Profiles.Exif.ExifProfile exif = image.Metadata.ExifProfile;

                    if (exif != null)
                    {
                        foreach (var value in exif.Values)
                        {
                            Console.WriteLine("EXIF Value: " + value);
                            // Sprawdź, czy wartość jest datą
                            if (value.Tag == SixLabors.ImageSharp.Metadata.Profiles.Exif.ExifTag.DateTimeOriginal ||
                                value.Tag == SixLabors.ImageSharp.Metadata.Profiles.Exif.ExifTag.DateTime)
                            {
                                Console.WriteLine("Taking Exif Date");
                                // Spróbuj sparsować wartość jako datę
                                return DateTime.ParseExact(value.ToString(), "yyyy:MM:dd HH:mm:ss", System.Globalization.CultureInfo.InvariantCulture);
                            }
                        }
                    }

                    Console.WriteLine("No Exif Date");
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }

            // Jeśli nie udało się znaleźć metadanych, zwróć aktualną datę i czas
            return DateTime.Now;
        }

        public Image DeleteImage(DeleteImageRequest request)
        {
            var image = _context.Images.FirstOrDefault(x => x.Id == request.Id);
            var categories = _context.ImageCategories.Where(x => x.ImageId == image.Id).ToList();
            if (categories.Count != 0)
            {
                foreach (var category in categories)
                {
                    _context.ImageCategories.Remove(category);
                }
            }
            _context.Images.Remove(image);
            _context.SaveChanges();

            return image;
        }

        public GetImageResponse GetImage(GetImageRequest request)
        {
            var image = _context.Images.FirstOrDefault(x => x.Id == request.Id);

            if (image != null)
            {
                image.ImageCategories = _context.ImageCategories.Where(x => x.ImageId == image.Id).ToList();
            }
            var response = _mapper.Map<GetImageResponse>(image);

            foreach (var item in response.ImageCategories)
            {
                var cat = _context.Categories.FirstOrDefault(x => x.Id == item.CategoryId);
                item.CategoryName = cat == null ? string.Empty : cat.CategoryName;
            }

            return response;
        }

        public IEnumerable<GetImageResponse> GetByCategory(GetByCategoryRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            if (accountId == null)
            {
                return null;
            }

            var imageCategories = _context.ImageCategories.Where(x => x.CategoryId == request.CategoryId).ToList();

            var images = new List<Image>();
            foreach (var imageCategory in imageCategories)
            {
                var image = _context.Images.SingleOrDefault(x => x.Id == imageCategory.ImageId && x.AccountId == accountId);
                images.Add(image);
            }

            var response = _mapper.Map<IList<GetImageResponse>>(images);
            return response;
        }

        public IEnumerable<GetImageResponse> GetByName(GetByTextRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            if (accountId == null)
            {
                return null;
            }

            var images = _context.Images.Where(x => x.AccountId == accountId && x.FolderId == request.FolderId && x.ImageTitle.Contains(request.Text)).ToList();

            var response = _mapper.Map<IList<GetImageResponse>>(images);
            return response;
        }

        public IEnumerable<GetImageResponse> GetByDate(GetByDateRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            if (accountId == null)
            {
                return null;
            }

            var images = request.IsLastest
                ? _context.Images.Where(x => x.AccountId == accountId && x.FolderId == request.FolderId).OrderBy(x => x.ImageDateOfCreate).ToList()
                : _context.Images.Where(x => x.AccountId == accountId && x.FolderId == request.FolderId).OrderByDescending(x => x.ImageDateOfCreate).ToList();

            var response = _mapper.Map<IList<GetImageResponse>>(images);
            return response;
        }


        public Image EditImage(EditImageRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            if (accountId == null)
            {
                return null;
            }

            var image = _context.Images.FirstOrDefault(x => x.Id == request.Id);

            if (image == null)
            {
                return null;
            }

            if (request.Title != null)
            {
                image.ImageTitle = request.Title;
            }

            if (request.Description != null)
            {
                image.ImageDescription = request.Description;
            }

            if (request.FolderId != null)
            {
                image.FolderId = request.FolderId;
            }

            if (request.Date != null)
            {
                image.ImageDateOfCreate = request.Date;
            }

            if (request.Categories.Length != 0)
            {
                var categories = _context.ImageCategories.Where(x => x.ImageId == image.Id).ToList();
                foreach (var category in categories)
                {
                    _context.ImageCategories.Remove(category);
                }
                foreach (var category in request.Categories)
                {
                    ImageCategory imageCategory = new ImageCategory();
                    imageCategory.ImageId = image.Id;
                    imageCategory.CategoryId = category;
                    _context.ImageCategories.Add(imageCategory);
                }
            }
            _context.Images.Update(image);
            _context.SaveChanges();

            return image;
        }
    }
}
