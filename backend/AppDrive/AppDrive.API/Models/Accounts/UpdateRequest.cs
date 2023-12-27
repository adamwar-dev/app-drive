using AppDrive.API.Entities;
using System.ComponentModel.DataAnnotations;

namespace AppDrive.API.Models.Accounts
{
    public class UpdateRequest
    {

        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        [EnumDataType(typeof(Role))]
        public string Role { get; set; }

        [EmailAddress]
        public string Email { get; set; }

        [MinLength(6)]
        public string Password { get; set; }

        [Compare("Password")]
        public string ConfirmPassword { get; set; }

    }
}
