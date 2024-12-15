using Application.Common.RequestHelpers;
using Application.SalesPerson.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.SalesPerson.Queries.GetSalesPersons;

public class GetSalesPersonsQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<SalespersonVm>>, IEnumerable<SalespersonVm>>
{
    private readonly IMapper _mapper;
    private readonly IGenericRepository<Salesperson> _salesPersonsRepository;

    public GetSalesPersonsQueryHandler(IGenericRepository<Salesperson> salesPersonsRepository, IMapper mapper)
    {
        _salesPersonsRepository = salesPersonsRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<SalespersonVm>> Handle(NoInputRequest<IEnumerable<SalespersonVm>> request, CancellationToken cancellationToken)
    {
        var result = await _salesPersonsRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<SalespersonVm>>(result);
    }
}
