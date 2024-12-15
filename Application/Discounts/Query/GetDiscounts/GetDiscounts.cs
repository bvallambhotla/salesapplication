using Application.Common.RequestHelpers;
using Application.Discounts.Models;
using Application.Products.Models;
using Domain.Interfaces.Repositories;
using Profisee.Domain.Entities;

namespace Application.Products.Queries.GetProducts;

public class GetDisocuntsQueryHandler : IRequestHandler<NoInputRequest<IEnumerable<DiscountVm>>, IEnumerable<DiscountVm>>
{
    private readonly IMapper _mapper;
    private readonly IGenericRepository<Discount> _discountsRepository;

    public GetDisocuntsQueryHandler(IGenericRepository<Discount> discountsRepository, IMapper mapper)
    {
        _discountsRepository = discountsRepository;
        _mapper = mapper;
    }

    public async Task<IEnumerable<DiscountVm>> Handle(NoInputRequest<IEnumerable<DiscountVm>> request, CancellationToken cancellationToken)
    {
        var result = await _discountsRepository.GetAllWithProjectionAsync(discount => new DiscountVm
        {
            DiscountId = discount.DiscountId,
            BeginDate = discount.BeginDate,
            DiscountPercentage = discount.DiscountPercentage,
            EndDate = discount.EndDate,
            ProductId = discount.ProductId,
            Product = new ProductVm
            {
                ProductId = discount.Product.ProductId,
                Name = discount.Product.Name
            }
        });
        return result;

    }
}
