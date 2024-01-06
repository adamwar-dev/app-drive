using AppDrive.API.Models.Folders;
using AppDrive.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AppDrive.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FolderController : ControllerBase
    {

        private readonly IFolderService _folderService;

        public FolderController(IFolderService folderService)
        {
            _folderService = folderService;
        }

        [HttpPost("GetMainFolder")]
        public IActionResult GetMainFolder(GetMainFoldersRequest request)
        {
            var response = _folderService.GetMainFolder(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

        [HttpPost("GetFolder")]
        public IActionResult GetFolder(GetFolderRequest request)
        {
            var response = _folderService.GetFolder(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

        [HttpPost("GetShareFolder")]
        public IActionResult GetShareFolder(GetFolderRequest request)
        {
            var response = _folderService.GetShareFolder(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

        [HttpPost("AddFolder")]
        public IActionResult AddFolder(AddFolderRequest request)
        {
            var response = _folderService.AddFolder(request);

            if (response != null) return Ok(response);
            else return BadRequest();
        }

        [HttpPost("DeleteFolder")]
        public IActionResult DeleteFolder(DeleteFolderRequest request)
        {
            var response = _folderService.DeleteFolder(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

        [HttpPost("GetFoldersList")]
        public IActionResult GetFolderList(GetFoldersListRequest request) //TODO mapping
        {
            var response = _folderService.GetFolderList(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

        [HttpPost("GetFolderStats")]
        public IActionResult GetFolderStats(FolderStatsRequest request)
        {
            var response = _folderService.GetFolderStats(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

    }
}
