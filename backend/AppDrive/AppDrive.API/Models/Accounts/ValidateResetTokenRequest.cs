﻿using System.ComponentModel.DataAnnotations;

namespace AppDrive.API.Models.Accounts
{
    public class ValidateResetTokenRequest
    {
        [Required]
        public string Token { get; set; }
    }
}
