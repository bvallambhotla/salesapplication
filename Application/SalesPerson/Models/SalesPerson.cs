using Application.Sales.Models;
using Profisee.Domain.Entities;

namespace Application.SalesPerson.Models;
public class SalespersonVm
{
    public int SalespersonId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Name { get { return $"{FirstName} {LastName}"; } }
    public string Address { get; set; }
    public string Phone { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? TerminationDate { get; set; }
    public int? ManagerId { get; set; }
    public SalespersonVm Manager { get; set; }

    public IEnumerable<SaleVm> Sales { get; set; }

    private class Mapping : Profile
    {
        public Mapping()
        {
            CreateMap<Salesperson, SalespersonVm>().ReverseMap();
        }
    }
}
