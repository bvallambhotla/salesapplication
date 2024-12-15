

namespace Profisee.Domain.Entities;
public class Discount
{
    public int DiscountId { get; set; }
    public int ProductId { get; set; }
    public DateTime BeginDate { get; set; }
    public DateTime EndDate { get; set; }
    public decimal DiscountPercentage { get; set; }

    public Product Product { get; set; }
}
