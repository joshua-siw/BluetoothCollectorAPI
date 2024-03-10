using BluetoothCollectorAPI.Application.DTOs;
using BluetoothCollectorAPI.Application.DTOs.Account.Requests;
using BluetoothCollectorAPI.Application.DTOs.Account.Responses;
using BluetoothCollectorAPI.Application.Interfaces;
using BluetoothCollectorAPI.Application.Interfaces.UserInterfaces;
using BluetoothCollectorAPI.Application.Wrappers;
using BluetoothCollectorAPI.Infrastructure.Identity.Contexts;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Infrastructure.Identity.Services
{
    public class GetUserServices(IdentityContext identityContext) : IGetUserServices
    {
        public async Task<PagedResponse<UserDto>> GetPagedUsers(GetAllUsersRequest model)
        {
            var skip = (model.PageNumber - 1) * model.PageSize;
            var users = await identityContext.Users
                .OrderBy(u => u.Name)
                .Skip(skip)
                .Take(model.PageSize)
                .Select(u => new UserDto()
                {
                    Name = u.Name,
                    Email = u.Email,
                    UserName = u.UserName,
                    PhoneNumber = u.PhoneNumber,
                    Id = u.Id,
                    Created = u.Created,
                    Role = identityContext.UserRoles
                        .Where(ur => ur.UserId == u.Id)
                        .Join(identityContext.Roles,
                            ur => ur.RoleId,
                            r => r.Id,
                            (ur, r) => r.Name)
                        .FirstOrDefault() 
                }).ToListAsync();

            var result = new PaginationResponseDto<UserDto>(users, await identityContext.Users.CountAsync());

            return new PagedResponse<UserDto>(result, model.PageNumber, model.PageSize);
        }
    }
}
