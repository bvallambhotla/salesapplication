
namespace Profisee.Domain.Entities;

public class Customer
{
    public int CustomerId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public DateTime StartDate { get; set; }

    public ICollection<Sale> Sales { get; set; }
}

