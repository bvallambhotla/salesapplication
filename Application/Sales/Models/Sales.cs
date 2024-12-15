using Application.Customers.Models;
using Application.Products.Models;
using Application.SalesPerson.Models;
using Profisee.Domain.Entities;

namespace Application.Sales.Models;
public class SaleVm
{
    public int SaleId { get; set; }
    public int ProductId { get; set; }
    public int SalespersonId { get; set; }
    public int CustomerId { get; set; }
    public DateTime SalesDate { get; set; }
    public decimal SalePrice { get; set; }
    public decimal Commission { get; set; }

    public ProductVm Product { get; set; }
    public SalespersonVm Salesperson { get; set; }
    public CustomerVm Customer { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Sale, SaleVm>().ReverseMap();
        }
    }
}
