using AppDrive.API.Authorization;
using AppDrive.API.Entities;
using AppDrive.API.Helpers;
using AppDrive.API.Models.Categories;
using AutoMapper;

namespace AppDrive.API.Services
{
    public interface ICategoryService
    {
        public Category AddTag(AddCategoryRequest request);
        public IEnumerable<CategoryResponse> GetTags(GetCategoryRequest request);
        public Category DeleteTag(DeleteCategoryRequest request);
        public Category GetCategoryByName(string name);
        public ImageCategory DeleteImageTag(DeleteCategoryRequest request);
    }

    public class CategoryService : ICategoryService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtUtils _jwtUtils;

        public CategoryService(DataContext context, IMapper mapper, IJwtUtils jwtUtils)
        {
            _context = context;
            _mapper = mapper;
            _jwtUtils = jwtUtils;
        }

        public Category AddTag(AddCategoryRequest request)
        {
            var category = _mapper.Map<Category>(request);
            category.AccountId = _jwtUtils.ValidateJwtToken(request.UserToken);
            _context.Categories.Add(category);
            _context.SaveChanges();
            return category;
        }


        public IEnumerable<CategoryResponse> GetTags(GetCategoryRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);
            var categories = _context.Categories.Where(x => x.AccountId == accountId);

            var response = _mapper.Map<IList<CategoryResponse>>(categories);

            return response;
        }

        public Category DeleteTag(DeleteCategoryRequest request)
        {
            var tag = _context.Categories.FirstOrDefault(x => x.Id == request.Id);

            var imageCategories = _context.ImageCategories.Where(x => x.CategoryId == tag.Id);

            foreach (var imageCategory in imageCategories)
            {
                _context.ImageCategories.Remove(imageCategory);
            }
            _context.SaveChanges();

            _context.Categories.Remove(tag);
            _context.SaveChanges();

            return tag;
        }

        public ImageCategory DeleteImageTag(DeleteCategoryRequest request)
        {
            var imageCategory = _context.ImageCategories.FirstOrDefault(x => x.Id == request.Id);

            _context.ImageCategories.Remove(imageCategory);
            _context.SaveChanges();

            return imageCategory;
        }

        public Category GetCategoryByName(string name)
        {
            return _context.Categories.FirstOrDefault(x => x.CategoryName == name);
        }
    }
}
