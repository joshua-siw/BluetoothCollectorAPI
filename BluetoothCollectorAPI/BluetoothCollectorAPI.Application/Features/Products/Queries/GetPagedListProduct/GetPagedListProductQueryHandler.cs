using BluetoothCollectorAPI.Application.Interfaces.Repositories;
using BluetoothCollectorAPI.Application.Wrappers;
using BluetoothCollectorAPI.Domain.Products.Dtos;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Application.Features.Products.Queries.GetPagedListProduct
{
    public class GetPagedListProductQueryHandler(IProductRepository productRepository) : IRequestHandler<GetPagedListProductQuery, PagedResponse<ProductDto>>
    {
        public async Task<PagedResponse<ProductDto>> Handle(GetPagedListProductQuery request, CancellationToken cancellationToken)
        {
            var result = await productRepository.GetPagedListAsync(request.PageNumber, request.PageSize, request.Name);

            return new PagedResponse<ProductDto>(result, request);
        }
    }
}
