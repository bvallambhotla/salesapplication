using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;
using System.Data;

namespace Profisee.Application.SalesPerson.Commands.UpdateSalePerson;

public record UpdateSalesPersonCommand : IRequest
{
    public int SalespersonId { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Address { get; set; }
    public string Phone { get; set; }
    public DateTime StartDate { get; set; }
    public DateTime? TerminationDate { get; set; }
    public int? ManagerId { get; set; }
}

public class UpdateSalesPersonCommandHandler : IRequestHandler<UpdateSalesPersonCommand>
{
    private readonly IGenericRepository<Salesperson> _salespersonRepository;

    public UpdateSalesPersonCommandHandler(IGenericRepository<Salesperson> salespersonRepository)
    {
        _salespersonRepository = salespersonRepository;
    }

    public async Task Handle(UpdateSalesPersonCommand request, CancellationToken cancellationToken)
    {
        var salesperson = await _salespersonRepository.GetByIdAsync(request.SalespersonId);
        if (salesperson == null) throw new NotFoundException(request.SalespersonId.ToString(), "Salesperson does not exist.");

        var existingSalesperson = await _salespersonRepository.GetByConditionAsync(x =>
            x.FirstName.ToLower() == request.FirstName &&
            x.LastName.ToLower() == request.LastName &&
            x.SalespersonId != request.SalespersonId
        );

        if (existingSalesperson.Any())
            throw new DuplicateNameException("Salesperson already exists.");

        salesperson.FirstName = request.FirstName;
        salesperson.LastName = request.LastName;
        salesperson.Address = request.Address;
        salesperson.Phone = request.Phone;
        salesperson.StartDate = request.StartDate;
        salesperson.TerminationDate = request.TerminationDate;
        salesperson.ManagerId = request.ManagerId;

        await _salespersonRepository.UpdateAsync(salesperson);
    }
}
