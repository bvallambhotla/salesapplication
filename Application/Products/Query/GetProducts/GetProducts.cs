using Application.Common.RequestHelpers;
using Application.Products.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.Products.Queries.GetProducts;

public class GetProductsQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<ProductVm>>, IEnumerable<ProductVm>>
{
    private readonly IMapper _mapper;
    private readonly IGenericRepository<Product> _productsRepository;

    public GetProductsQueryHandler(IGenericRepository<Product> productsRepository, IMapper mapper)
    {
        _productsRepository = productsRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<ProductVm>> Handle(NoInputRequest<IEnumerable<ProductVm>> request, CancellationToken cancellationToken)
    {
        var result = await _productsRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<ProductVm>>(result);
    }
}
