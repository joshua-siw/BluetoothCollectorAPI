
using BluetoothCollectorAPI.Application.DTOs.Account.Requests;
using BluetoothCollectorAPI.Application.DTOs.Account.Responses;
using BluetoothCollectorAPI.Application.Interfaces.UserInterfaces;
using BluetoothCollectorAPI.Application.Wrappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.WebApi.Controllers.v1
{
    [ApiVersion("1")]
    public class AccountController(IAccountServices accountServices) : BaseApiController
    {
        [HttpPost]
        public async Task<BaseResult<AuthenticationResponse>> Authenticate(AuthenticationRequest request)
            => await accountServices.Authenticate(request);
        
        [HttpPost]
        public async Task<BaseResult<LogoutResponse>> Logout(LogoutRequest request)
            => await accountServices.Logout(request);

        [HttpPut, Authorize]
        public async Task<BaseResult> ChangeUserName(ChangeUserNameRequest model)
            => await accountServices.ChangeUserName(model);

        [HttpPut, Authorize]
        public async Task<BaseResult> ChangePassword(ChangePasswordRequest model)
            => await accountServices.ChangePassword(model);

        [HttpPost]
        public async Task<BaseResult<AuthenticationResponse>> Start()
        {
            var guestUsername = await accountServices.RegisterGuestAccount();
            return await accountServices.AuthenticateByUserName(guestUsername.Data);
        }
    }
}