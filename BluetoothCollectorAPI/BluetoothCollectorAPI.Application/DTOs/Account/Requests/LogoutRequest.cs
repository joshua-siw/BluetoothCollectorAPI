using BluetoothCollectorAPI.Application.Helpers;
using BluetoothCollectorAPI.Application.Interfaces;
using FluentValidation;
using static System.Net.Mime.MediaTypeNames;

namespace BluetoothCollectorAPI.Application.DTOs.Account.Requests
{
    public class LogoutRequest
    {
        public string UserName { get; set; }

        public string Password { get; set; }
    }
    public class LogoutRequestValidator : AbstractValidator<LogoutRequest>
    {
        public LogoutRequestValidator(ITranslator translator)
        {
            RuleFor(x => x.UserName)
                .NotEmpty()
                .NotNull()
                .WithName(p => translator[nameof(p.UserName)]);

            RuleFor(x => x.Password)
                .NotEmpty()
                .NotNull()
                .Matches(Regexs.Password)
                .WithName(p => translator[nameof(p.Password)]);
        }
    }
}
