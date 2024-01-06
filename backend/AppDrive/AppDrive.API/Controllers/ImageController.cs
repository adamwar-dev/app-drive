using AppDrive.API.Models.Images;
using AppDrive.API.Services;
using Microsoft.AspNetCore.Mvc;

namespace AppDrive.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImageController : ControllerBase
    {
        private readonly IImageService _imageService;

        public ImageController(IImageService imageService)
        {
            _imageService = imageService;
        }

        [HttpPost("AddImages")]
        public IActionResult AddImages(AddImageRequest request)
        {
            var response = _imageService.AddImages(request);

            if (response != null) return Ok();
            else return NotFound();
        }

        [HttpPost("GetImage")]
        public IActionResult GetImage(GetImageRequest request)
        {
            var response = _imageService.GetImage(request);

            if (response != null) return Ok(response);
            else return NotFound();
        }

        [HttpPost("EditImage")]
        public IActionResult EditImage(EditImageRequest request)
        {
            var response = _imageService.EditImage(request);

            if (response != null) return Ok();
            else return NotFound();
        }

        [HttpPost("DeleteImage")]
        public IActionResult DeleteImage(DeleteImageRequest request)
        {
            var response = _imageService.DeleteImage(request);

            if (response != null) return Ok();
            else return NotFound();
        }
    }
}
