using BluetoothCollectorAPI.Application.Parameters;
using BluetoothCollectorAPI.Application.Wrappers;
using BluetoothCollectorAPI.Domain.Products.Dtos;
using MediatR;

namespace BluetoothCollectorAPI.Application.Features.Products.Queries.GetPagedListProduct
{
    public class GetPagedListProductQuery : PaginationRequestParameter, IRequest<PagedResponse<ProductDto>>
    {
        public string Name { get; set; }
    }
}
