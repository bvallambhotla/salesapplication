
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace Profisee.Controllers;

[ApiController]
[Route("api/[controller]")]
public abstract class BaseController<T> : ControllerBase
{
    protected readonly IMediator _mediator;
    private readonly ILogger<T> _logger;
    protected BaseController(IMediator mediator, ILogger<T> logger) { 
        _mediator = mediator;
        _logger = logger;
    }
}
