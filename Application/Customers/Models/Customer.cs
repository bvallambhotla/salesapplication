using Profisee.Domain.Entities;

namespace Application.Customers.Models;
public class CustomerVm
{
    public int CustomerId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Name { get { return $"{FirstName} {LastName}"; } }
    public string Address { get; set; }
    public string Phone { get; set; }
    public DateTime StartDate { get; set; }
    public IList<Sale> Sales { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Customer, CustomerVm>().ReverseMap();
        }
    }
}
