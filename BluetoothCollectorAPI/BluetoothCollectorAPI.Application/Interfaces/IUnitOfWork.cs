using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Application.Interfaces
{
    public interface IUnitOfWork
    {
        Task<bool> SaveChangesAsync();
    }
}
