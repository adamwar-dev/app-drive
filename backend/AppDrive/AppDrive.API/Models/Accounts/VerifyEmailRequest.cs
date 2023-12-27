using System.ComponentModel.DataAnnotations;

namespace AppDrive.API.Models.Accounts
{
    public class VerifyEmailRequest
    {
        [Required]
        public string Token { get; set; }
    }
}
