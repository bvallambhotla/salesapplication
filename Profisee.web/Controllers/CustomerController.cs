using Application.Common.RequestHelpers;
using Application.Customers.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profisee.Controllers;

namespace Profiseeweb.Controllers;

public class CustomerController(ILogger<CustomerController> logger, IMediator mediator)
    : BaseController<CustomerController>(mediator, logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new NoInputRequest<IEnumerable<CustomerVm>>());
        return Ok(result);
    }
}
