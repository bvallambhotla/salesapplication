using Application.Customers.Models;
using Application.Products.Models;
using Application.SalesPerson.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Profisee.Application.Sales.Commands.AddSale;

public record AddSaleCommand : IRequest
{
    public int SaleId { get; set; }
    public int ProductId { get; set; }
    public int SalespersonId { get; set; }
    public int CustomerId { get; set; }
    public DateTime SalesDate { get; set; }
    public decimal SalePrice { get; set; }
    public decimal Commission { get; set; }
}

public class AddSaleCommandHandler : IRequestHandler<AddSaleCommand>
{
    private readonly IGenericRepository<Sale> _salesRepository;
    IGenericRepository<Salesperson> _salespersonRepository;
    IGenericRepository<Product> _productRepository;
    IGenericRepository<Discount> _discountRepository;

    public AddSaleCommandHandler(
        IGenericRepository<Sale> salesRepository,
        IGenericRepository<Salesperson> salespersonRepository,
        IGenericRepository<Product> productRepository,
        IGenericRepository<Discount> discountRepository
        )
    {
        _salesRepository = salesRepository;
        _productRepository = productRepository;
        _salespersonRepository = salespersonRepository;
        _discountRepository = discountRepository;
    }

    public async Task Handle(AddSaleCommand request, CancellationToken cancellationToken)
    {
        var product = await _productRepository.GetByIdAsync(request.ProductId);
        var salesperson = await _salespersonRepository.GetByIdAsync(request.SalespersonId);

        if (product == null || salesperson == null) throw new InvalidDataException("Invalid product or salesperson");
        
        decimal commission = (request.SalePrice * product.CommissionPercentage) / 100;

        var sale = new Sale
        {
            ProductId = request.ProductId,
            SalespersonId = request.SalespersonId,
            CustomerId = request.CustomerId,
            SalesDate = DateTime.UtcNow,
            SalePrice = request.SalePrice,
            Commission = commission
        };

        await _salesRepository.AddAsync(sale);
    }
}
