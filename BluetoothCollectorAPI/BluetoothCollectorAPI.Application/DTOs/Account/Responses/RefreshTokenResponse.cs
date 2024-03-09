namespace BluetoothCollectorAPI.Application.DTOs.Account.Responses;

public class RefreshTokenResponse
{
    public string JWToken { get; set; }
    public double TokenThreshold { get; set; }
    public string RefreshToken { get; set; }
}