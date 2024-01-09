namespace AppDrive.API.Models.Accounts
{
    public class ExternalAuthRequest
    {
        public string Email { get; set; }
        public string ExternalId { get; set; }
        public string ExternalType { get; set; }
    }
}
