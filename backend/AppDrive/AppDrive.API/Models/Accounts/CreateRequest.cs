using AppDrive.API.Entities;
using System.ComponentModel.DataAnnotations;

namespace AppDrive.API.Models.Accounts
{
    public class CreateRequest
    {

        [Required]
        public string FirstName { get; set; }

        [Required]
        [EnumDataType(typeof(Role))]
        public string Role { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [MinLength(6)]
        public string Password { get; set; }

        [Required]
        [Compare("Password")]
        public string ConfirmPassword { get; set; }
    }
}
