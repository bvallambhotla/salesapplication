using Application.Common.RequestHelpers;
using Application.Customers.Models;
using Application.SalesPerson.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.SalesPerson.Queries.GetSalesPersons;

public class GetSalesPersonsLiteQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<SalespersonLite>>, IEnumerable<SalespersonLite>>
{
    private readonly IGenericRepository<Salesperson> _salesPersonsRepository;

    public GetSalesPersonsLiteQueryHandler(IGenericRepository<Salesperson> salesPersonsRepository)
    {
        _salesPersonsRepository = salesPersonsRepository;
    }

    public async Task<IEnumerable<SalespersonLite>> Handle(NoInputRequest<IEnumerable<SalespersonLite>> request, CancellationToken cancellationToken)
    {
        var result = await _salesPersonsRepository.GetAllWithProjectionAsync(salesPerson => new SalespersonLite
        {
            Title = $"{salesPerson.FirstName} {salesPerson.LastName}",
            Id = salesPerson.SalespersonId
        });

        return result;
    }
}
