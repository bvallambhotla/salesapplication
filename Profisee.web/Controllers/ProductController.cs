using Application.Common.RequestHelpers;
using Application.Products.Models;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Profisee.Application.SalesPerson.Commands.UpdateSalePerson;
using Profisee.Controllers;

namespace Profiseeweb.Controllers;

public class ProductController(ILogger<ProductController> logger, IMediator mediator)
    : BaseController<ProductController>(mediator, logger)
{
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _mediator.Send(new NoInputRequest<IEnumerable<ProductVm>>());
        return Ok(result);
    }

    [HttpPut]
    public async Task<IActionResult> Update(UpdateProductCommand request)
    {
        if (request == null) return BadRequest();
        await _mediator.Send(request);
        return Ok();
    }
}
