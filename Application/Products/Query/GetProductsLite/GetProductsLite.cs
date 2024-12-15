using Application.Common.RequestHelpers;
using Application.Products.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.Products.Queries.GetProductsLite;

public class GetProductsLiteQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<ProductLite>>, IEnumerable<ProductLite>>
{
    private readonly IGenericRepository<Product> _productRepository;

    public GetProductsLiteQueryHandler(IGenericRepository<Product> productRepository)
    {
        _productRepository = productRepository;
    }

    public async Task<IEnumerable<ProductLite>> Handle(NoInputRequest<IEnumerable<ProductLite>> request, CancellationToken cancellationToken)
    {
        var result = await _productRepository.GetAllWithProjectionAsync(product => new ProductLite
        {
            Title = product.Name,
            Id = product.ProductId
        });

        return result;
    }
}
