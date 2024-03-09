using BluetoothCollectorAPI.Infrastructure.Identity.Models;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Infrastructure.Identity.Seeds
{
    public static class DefaultRoles
    {
        public static async Task SeedAsync(RoleManager<ApplicationRole> roleManager)
        {
            //Seed Roles
            if (!await roleManager.RoleExistsAsync("Admin"))
                await roleManager.CreateAsync(new ApplicationRole("Admin"));
            if (!await roleManager.RoleExistsAsync("ScanDevice"))
                await roleManager.CreateAsync(new ApplicationRole("ScanDevice"));
            if (!await roleManager.RoleExistsAsync("User"))
                await roleManager.CreateAsync(new ApplicationRole("User"));
        }
    }
}
