using BluetoothCollectorAPI.Application.Wrappers;
using MediatR;

namespace BluetoothCollectorAPI.Application.Features.Products.Commands.DeleteProduct
{
    public class DeleteProductCommand : IRequest<BaseResult>
    {
        public long Id { get; set; }
    }
}
