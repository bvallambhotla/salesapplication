using Application.Common.RequestHelpers;
using Application.Customers.Models;
using Application.Discounts.Models;
using Application.Products.Models;
using Application.SalesPerson.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profisee.Controllers;

namespace Profiseeweb.Controllers;

public class LookupsController(ILogger<LookupsController> logger, IMediator mediator)
    : BaseController<LookupsController>(mediator, logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = new
        {
            products = await _mediator.Send(new NoInputRequest<IEnumerable<ProductLite>>()),
            customers = await _mediator.Send(new NoInputRequest<IEnumerable<CustomerLite>>()),
            salespersons = await _mediator.Send(new NoInputRequest<IEnumerable<SalespersonLite>>()),
            discounts = await _mediator.Send(new NoInputRequest<IEnumerable<DiscountVm>>())
        };

        return Ok(result);
    }
}
