using System.Collections.Generic;
using BluetoothCollectorAPI.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System.Linq;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Infrastructure.Identity.Seeds
{
    public static class DefaultBasicUser
    {
        public static async Task SeedAsync(UserManager<ApplicationUser> userManager)
        {
            var usersData = new List<ApplicationUser>
            {
                new ApplicationUser
                {
                    UserName = "Admddin",
                    Email = "admieen@example.com",
                    Name = "AdminUser",
                    PhoneNumber = "1234567890",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true
                },
                new ApplicationUser
                {
                    UserName = "useddr1",
                    Email = "useeer1@example.com",
                    Name = "UserOne",
                    PhoneNumber = "9876543210",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true
                },
                new ApplicationUser
                {
                    UserName = "useddr232143243dwadwa2",
                    Email = "joshua233ddddd3@example.com",
                    Name = "UserddddddTwo",
                    PhoneNumber = "5555555555",
                    EmailConfirmed = true,
                    PhoneNumberConfirmed = true
                }
            };

            foreach (var userData in usersData)
            {
                var existingUser = await userManager.FindByEmailAsync(userData.Email);
                if (existingUser != null) continue;
                var result = await userManager.CreateAsync(userData, "Password123!");
                if (result.Succeeded)
                {
                    await userManager.AddToRoleAsync(userData, "ScanDevice");
                }
            }
        }
    }
}
