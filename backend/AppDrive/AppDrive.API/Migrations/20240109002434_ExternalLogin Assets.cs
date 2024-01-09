using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AppDrive.API.Migrations
{
    public partial class ExternalLoginAssets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ExternalId",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ExternalType",
                table: "Account",
                type: "nvarchar(max)",
                nullable: true,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ExternalId",
                table: "Account");

            migrationBuilder.DropColumn(
                name: "ExternalType",
                table: "Account");
        }
    }
}
