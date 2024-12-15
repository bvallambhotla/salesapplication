using Application.Common.RequestHelpers;
using Application.Customers.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.Customers.Queries.GetCustomers;

public class GetCustomersQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<CustomerVm>>, IEnumerable<CustomerVm>>
{
    private readonly IMapper _mapper;
    private readonly IGenericRepository<Customer> _customerRepository;

    public GetCustomersQueryHandler(IGenericRepository<Customer> customerRepository, IMapper mapper)
    {
        _customerRepository = customerRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<CustomerVm>> Handle(NoInputRequest<IEnumerable<CustomerVm>> request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<CustomerVm>>(result);
    }
}
