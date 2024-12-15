using Application.Common.RequestHelpers;
using Application.SalesPerson.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profisee.Application.SalesPerson.Commands.UpdateSalePerson;
using Profisee.Controllers;

namespace Profiseeweb.Controllers;

public class SalesPersonController(ILogger<SalesPersonController> logger, IMediator mediator) 
    : BaseController<SalesPersonController>(mediator, logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new NoInputRequest<IEnumerable<SalespersonVm>>());
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateSalesPersonCommand request)
    {
        if (request == null) return BadRequest();
        await _mediator.Send(request);
        return Ok();
    }
}
