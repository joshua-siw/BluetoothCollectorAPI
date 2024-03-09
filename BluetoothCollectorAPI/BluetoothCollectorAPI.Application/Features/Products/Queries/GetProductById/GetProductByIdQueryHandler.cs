using BluetoothCollectorAPI.Application.Helpers;
using BluetoothCollectorAPI.Application.Interfaces;
using BluetoothCollectorAPI.Application.Interfaces.Repositories;
using BluetoothCollectorAPI.Application.Wrappers;
using BluetoothCollectorAPI.Domain.Products.Dtos;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Application.Features.Products.Queries.GetProductById
{
    public class GetProductByIdQueryHandler(IProductRepository productRepository, ITranslator translator) : IRequestHandler<GetProductByIdQuery, BaseResult<ProductDto>>
    {
        public async Task<BaseResult<ProductDto>> Handle(GetProductByIdQuery request, CancellationToken cancellationToken)
        {
            var product = await productRepository.GetByIdAsync(request.Id);

            if (product is null)
            {
                return new BaseResult<ProductDto>(new Error(ErrorCode.NotFound, translator.GetString(TranslatorMessages.ProductMessages.Product_notfound_with_id(request.Id)), nameof(request.Id)));
            }

            var result = new ProductDto(product);

            return new BaseResult<ProductDto>(result);
        }
    }
}
