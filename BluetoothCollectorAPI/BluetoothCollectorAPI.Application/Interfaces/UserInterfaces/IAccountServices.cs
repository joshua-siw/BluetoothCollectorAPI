using BluetoothCollectorAPI.Application.DTOs.Account.Requests;
using BluetoothCollectorAPI.Application.DTOs.Account.Responses;
using BluetoothCollectorAPI.Application.Wrappers;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Application.Interfaces.UserInterfaces
{
    public interface IAccountServices
    {
        Task<BaseResult<string>> RegisterGuestAccount();
        Task<BaseResult> ChangePassword(ChangePasswordRequest model);
        Task<BaseResult> ChangeUserName(ChangeUserNameRequest model);
        Task<BaseResult<AuthenticationResponse>> Authenticate(AuthenticationRequest request);
        Task<BaseResult<AuthenticationResponse>> AuthenticateByUserName(string username);
        Task<BaseResult<LogoutResponse>> Logout(LogoutRequest request);

    }
}
