using System.Threading.Tasks;
using BluetoothCollectorAPI.Application.DTOs.Account.Requests;
using BluetoothCollectorAPI.Application.DTOs.Account.Responses;
using BluetoothCollectorAPI.Application.Interfaces.UserInterfaces;
using BluetoothCollectorAPI.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace BluetoothCollectorAPI.WebApi.Controllers.v1;

[ApiVersion("1")]
public class UserController(IGetUserServices getUserServices): BaseApiController
{
    [HttpPost]
    public async Task<PagedResponse<UserDto>> GetPagedListUser(GetAllUsersRequest request)
        => await getUserServices.GetPagedUsers(request);
}