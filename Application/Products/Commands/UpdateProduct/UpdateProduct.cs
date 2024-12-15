using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;
using System.Data;

namespace Profisee.Application.SalesPerson.Commands.UpdateSalePerson;

public record UpdateProductCommand : IRequest
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public string Style { get; set; }
    public decimal PurchasePrice { get; set; }
    public decimal SalePrice { get; set; }
    public int QtyOnHand { get; set; }
    public decimal CommissionPercentage { get; set; }
}

public class UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand>
{
    private readonly IGenericRepository<Product> _productRepository;

    public UpdateProductCommandHandler(IGenericRepository<Product> productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.ProductId);
        if (product == null) throw new NotFoundException(request.ProductId.ToString(), "Product does not exist.");

        var existingProduct = await _productRepository.GetByConditionAsync(p => p.Name.ToLower() == request.Name.ToLower() && p.ProductId != request.ProductId);
        if (existingProduct.Any())
            throw new DuplicateNameException("Product already exists.");

        product.Name = request.Name;
        product.Manufacturer = request.Manufacturer;
        product.Style = request.Style;
        product.PurchasePrice = request.PurchasePrice;
        product.SalePrice = request.SalePrice;
        product.QtyOnHand = request.QtyOnHand;
        product.CommissionPercentage = request.CommissionPercentage;

        await _productRepository.UpdateAsync(product);
    }
}
