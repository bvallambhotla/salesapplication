using Application.Common.RequestHelpers;
using Application.Discounts.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profisee.Controllers;

namespace Profiseeweb.Controllers;

public class DiscountController(ILogger<DiscountController> logger, IMediator mediator)
    : BaseController<DiscountController>(mediator, logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new NoInputRequest<IEnumerable<DiscountVm>>());
        return Ok(result);
    }
}
