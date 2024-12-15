using Application.Common.RequestHelpers;
using Application.Sales.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profisee.Application.Sales.Commands.AddSale;
using Profisee.Controllers;

namespace Profiseeweb.Controllers;

public class SaleController(ILogger<SaleController> logger, IMediator mediator) 
    : BaseController<SaleController>(mediator, logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new NoInputRequest<IEnumerable<SaleVm>>());
        return Ok(result);
    }

    [HttpPost]
    public async Task<IActionResult> Create(AddSaleCommand request)
    {
        if (request == null) return BadRequest();
        await _mediator.Send(request);
        return Created();
    }
}
