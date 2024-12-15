
namespace Profisee.Domain.Entities;
public class Sale
{
    public int SaleId { get; set; }
    public int ProductId { get; set; } 
    public int SalespersonId { get; set; }
    public int CustomerId { get; set; } 
    public DateTime SalesDate { get; set; }
    public decimal SalePrice { get; set; } 
    public decimal Commission { get; set; }
    public Product Product { get; set; } 
    public Salesperson Salesperson { get; set; } 
    public Customer Customer { get; set; } 
}

