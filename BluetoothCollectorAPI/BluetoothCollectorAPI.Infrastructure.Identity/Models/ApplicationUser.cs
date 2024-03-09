using Microsoft.AspNetCore.Identity;
using System;

namespace BluetoothCollectorAPI.Infrastructure.Identity.Models
{
    public class ApplicationUser : IdentityUser<Guid>
    {
        public ApplicationUser()
        {
            Created = DateTime.Now;
        }
        public string Email { get; set; }
        public DateTime Created { get; set; }
    }
}
