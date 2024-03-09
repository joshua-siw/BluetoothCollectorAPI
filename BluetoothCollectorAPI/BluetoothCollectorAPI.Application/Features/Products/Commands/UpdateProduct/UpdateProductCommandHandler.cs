using BluetoothCollectorAPI.Application.Helpers;
using BluetoothCollectorAPI.Application.Interfaces;
using BluetoothCollectorAPI.Application.Interfaces.Repositories;
using BluetoothCollectorAPI.Application.Wrappers;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace BluetoothCollectorAPI.Application.Features.Products.Commands.UpdateProduct
{
    public class UpdateProductCommandHandler(IProductRepository productRepository, IUnitOfWork unitOfWork, ITranslator translator) : IRequestHandler<UpdateProductCommand, BaseResult>
    {
        public async Task<BaseResult> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
        {
            var product = await productRepository.GetByIdAsync(request.Id);

            if (product is null)
            {
                return new BaseResult(new Error(ErrorCode.NotFound, translator.GetString(TranslatorMessages.ProductMessages.Product_notfound_with_id(request.Id)), nameof(request.Id)));
            }

            product.Update(request.Name, request.Price, request.BarCode);
            await unitOfWork.SaveChangesAsync();

            return new BaseResult();
        }
    }
}
