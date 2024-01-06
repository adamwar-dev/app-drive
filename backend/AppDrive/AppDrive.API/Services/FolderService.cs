using AppDrive.API.Authorization;
using AppDrive.API.Entities;
using AppDrive.API.Helpers;
using AppDrive.API.Models.Folders;
using AutoMapper;

namespace AppDrive.API.Services
{
    public interface IFolderService
    {
        public GetFolderResponse GetFolder(GetFolderRequest request);
        public Folder AddFolder(AddFolderRequest request);
        public Folder DeleteFolder(DeleteFolderRequest request);
        public IEnumerable<GetMainFoldersResponse> GetMainFolder(GetMainFoldersRequest request);
        public IEnumerable<GetFolderListResponse> GetFolderList(GetFoldersListRequest request);
        public FolderStatsResponse GetFolderStats(FolderStatsRequest request);
    }
    public class FolderService : IFolderService
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        private readonly IJwtUtils _jwtUtils;

        public FolderService(DataContext context, IMapper mapper, IJwtUtils jwtUtils)
        {
            _context = context;
            _mapper = mapper;
            _jwtUtils = jwtUtils;
        }

        public Folder AddFolder(AddFolderRequest request)
        {
            var folder = _mapper.Map<Folder>(request);
            folder.AccountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            // WHY ACCOUNT ID IS OPTIONAL ??? 
            if (folder.AccountId == null)
                return null;

            _context.Folders.Add(folder);
            _context.SaveChanges();
            return folder;
        }

        public Folder DeleteFolder(DeleteFolderRequest request)
        {
            var folder = _context.Folders.FirstOrDefault(x => x.Id == request.FolderId);
            if (folder != null)
            {
                var nestedFolders = _context.Folders.Where(x => x.ParentFolderId == request.FolderId).ToList();
                DeleteNestedFolders(nestedFolders);

                var images = _context.Images.Where(x => x.FolderId == folder.Id).ToList();
                DeleteInnerImages(images);

                _context.Folders.Remove(folder);

                _context.SaveChanges();
            }

            return folder;
        }

        public GetFolderResponse GetFolder(GetFolderRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            var folder = _context.Folders.FirstOrDefault(x => x.Id == request.FolderId);

            if (folder != null)
            {
                folder.InverseParentFolder = _context.Folders.Where(x => x.AccountId == accountId && x.ParentFolderId == request.FolderId).ToList();
                folder.Images = _context.Images.Where(x => x.AccountId == accountId && x.FolderId == request.FolderId).ToList();
            }

            var response = _mapper.Map<GetFolderResponse>(folder);

            return response;
        }

        public IEnumerable<GetMainFoldersResponse> GetMainFolder(GetMainFoldersRequest request)//TODO
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);
            var folders = _context.Folders.Where(x => x.AccountId == accountId && x.ParentFolder == null);
            var response = _mapper.Map<IList<GetMainFoldersResponse>>(folders);

            return response;
        }

        public IEnumerable<GetFolderListResponse> GetFolderList(GetFoldersListRequest request)
        {
            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);
            var folders = _context.Folders.Where(x => x.AccountId == accountId);

            var response = _mapper.Map<IList<GetFolderListResponse>>(folders);//TODO

            return response;
        }

        private void DeleteNestedFolders(IEnumerable<Folder> nestedFolders)
        {
            foreach (var nestedFolder in nestedFolders)
            {
                var folders = _context.Folders.Where(x => x.ParentFolderId == nestedFolder.Id).ToList();
                var images = _context.Images.Where(x => x.FolderId == nestedFolder.Id).ToList();
                if (folders.Count != 0)
                {
                    DeleteNestedFolders(folders);
                }
                if (images.Count != 0)
                {
                    DeleteInnerImages(images);
                }
                _context.Folders.Remove(nestedFolder);
                _context.SaveChanges();
            }
        }

        public void DeleteInnerImages(IEnumerable<Image> images)
        {

            foreach (var image in images)
            {
                var categories = _context.ImageCategories.Where(x => x.ImageId == image.Id).ToList();
                DeleteInnerCategories(categories);
                _context.Images.Remove(image);
            }

            _context.SaveChanges();
        }

        public void DeleteInnerCategories(IEnumerable<ImageCategory> categories)
        {

            foreach (var category in categories)
            {
                _context.ImageCategories.Remove(category);
            }
            _context.SaveChanges();
        }

        public FolderStatsResponse GetFolderStats(FolderStatsRequest request)
        {
            var response = new FolderStatsResponse();

            var accountId = _jwtUtils.ValidateJwtToken(request.UserToken);

            var images = _context.Images.Where(x => x.FolderId == request.FolderId).ToList();

            response.ImageCount = images.Count();

            var ids = images.Select(x => x.Id);

            var ImageCategories = new List<ImageCategoryStatsResponse>();

            var categoryIdList = new List<int>();

            foreach (var id in ids)
            {
                var categoriesId = _context.ImageCategories.Where(x => x.ImageId == id).Select(x => x.CategoryId).ToList();

                foreach (var item in categoriesId)
                {
                    if (!categoryIdList.Contains(item.Value))
                    {
                        categoryIdList.Add(item.Value);
                    }
                }
            }

            foreach (var categoryId in categoryIdList)
            {
                var categoryStat = new ImageCategoryStatsResponse();
                var category = _context.Categories.FirstOrDefault(x => x.Id == categoryId);

                if (category != null)
                {
                    categoryStat.CategoryName = category.CategoryName;

                    foreach (var imageid in ids)
                    {
                        var imageCategory = _context.ImageCategories.Where(x => x.ImageId == imageid).Where(x => x.CategoryId == categoryId).ToList();

                        if (imageCategory != null && imageCategory.Count != 0)
                        {
                            categoryStat.ImageCount++;
                        }
                    }
                }
                ImageCategories.Add(categoryStat);
            }

            response.ImageCategories = ImageCategories;
            return response;
        }
    }
}
