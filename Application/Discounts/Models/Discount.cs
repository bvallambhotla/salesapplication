using Application.Products.Models;
using Profisee.Domain.Entities;

namespace Application.Discounts.Models;
public class DiscountVm
{
    public int DiscountId { get; set; }
    public int ProductId { get; set; }
    public DateTime BeginDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal DiscountPercentage { get; set; }

    public ProductVm Product { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Discount, DiscountVm>().ReverseMap();
        }
    }
}
