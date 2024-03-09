using BluetoothCollectorAPI.Application.DTOs;
using BluetoothCollectorAPI.Domain.Products.Dtos;
using BluetoothCollectorAPI.Domain.Products.Entities;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Application.Interfaces.Repositories
{
    public interface IProductRepository : IGenericRepository<Product>
    {
        Task<PagenationResponseDto<ProductDto>> GetPagedListAsync(int pageNumber, int pageSize, string name);
    }
}
