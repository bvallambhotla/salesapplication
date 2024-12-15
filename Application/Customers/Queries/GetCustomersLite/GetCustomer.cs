using Application.Common.RequestHelpers;
using Application.Customers.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.Customers.Queries.GetCustomers;

public class GetCustomersLiteQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<CustomerLite>>, IEnumerable<CustomerLite>>
{
    private readonly IGenericRepository<Customer> _customerRepository;

    public GetCustomersLiteQueryHandler(IGenericRepository<Customer> customerRepository)
    {
        _customerRepository = customerRepository;
    }

    public async Task<IEnumerable<CustomerLite>> Handle(NoInputRequest<IEnumerable<CustomerLite>> request, CancellationToken cancellationToken)
    {
        var result = await _customerRepository.GetAllWithProjectionAsync(customer => new CustomerLite
        {
            Title = $"{customer.FirstName} {customer.LastName}",
            Id = customer.CustomerId
        });

        return result;
    }
}
