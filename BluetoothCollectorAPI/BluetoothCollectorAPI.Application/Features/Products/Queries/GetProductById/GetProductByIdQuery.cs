using BluetoothCollectorAPI.Application.Wrappers;
using BluetoothCollectorAPI.Domain.Products.Dtos;
using MediatR;

namespace BluetoothCollectorAPI.Application.Features.Products.Queries.GetProductById
{
    public class GetProductByIdQuery : IRequest<BaseResult<ProductDto>>
    {
        public long Id { get; set; }
    }
}
