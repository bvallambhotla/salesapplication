using Application.Common.RequestHelpers;
using Application.Products.Models;
using Application.Sales.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.Sales.Queries.GetSales;

public class GetSalesQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<SaleVm>>, IEnumerable<SaleVm>>
{
    private readonly IMapper _mapper;
    private readonly IGenericRepository<Sale> _saleRepository;

    public GetSalesQueryHandler(IGenericRepository<Sale> customerRepository, IMapper mapper)
    {
        _saleRepository = customerRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SaleVm>> Handle(NoInputRequest<IEnumerable<SaleVm>> request, CancellationToken cancellationToken)
    {
        var result = await _saleRepository.GetAllWithProjectionAsync(sale => new SaleVm
        {
           Commission = sale.Commission,
           CustomerId = sale.CustomerId,
           ProductId = sale.ProductId,
           SaleId = sale.SaleId,
           SalePrice = sale.SalePrice,
           SalesDate = sale.SalesDate,
           SalespersonId = sale.SalespersonId,
           Customer = new Customers.Models.CustomerVm
           {
               CustomerId = sale.Customer.CustomerId,
               FirstName = sale.Customer.FirstName,
               LastName = sale.Customer.LastName
           },
           Salesperson = new SalesPerson.Models.SalespersonVm
           {
               SalespersonId = sale.Salesperson.SalespersonId,
               FirstName = sale.Salesperson.FirstName,
               LastName = sale.Salesperson.LastName
           },
           Product = new ProductVm
           {
               ProductId = sale.Product.ProductId,
               Name = sale.Product.Name
           }
        });
        return result;
    }
}
