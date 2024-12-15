
using Application.Discounts.Models;
using Application.Sales.Models;
using Profisee.Domain.Entities;

namespace Application.Products.Models;
public class ProductVm
{
    public int ProductId { get; set; }
    public string Name { get; set; }
    public string Manufacturer { get; set; }
    public string Style { get; set; }
    public decimal PurchasePrice { get; set; }
    public decimal SalePrice { get; set; }
    public int QtyOnHand { get; set; }
    public decimal CommissionPercentage { get; set; }

    public IList<DiscountVm> Discounts { get; set; }
    public IList<SaleVm> Sales { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Product, ProductVm>().ReverseMap();
        }
    }
}
