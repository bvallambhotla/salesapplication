using Azure.Identity;
using Profisee.Application.Common.Interfaces;
using Profisee.Infrastructure.Data;
using Microsoft.AspNetCore.Mvc;
using ProfiseeWeb.Infrastructure;

namespace Microsoft.Extensions.DependencyInjection;

public static class DependencyInjection
{
    public static void AddWebServices(this IHostApplicationBuilder builder)
    {

        builder.Services.AddHttpContextAccessor();
        builder.Services.AddHealthChecks();

        builder.Services.AddExceptionHandler<CustomExceptionHandler>();


        // Customise default API behaviour
        builder.Services.Configure<ApiBehaviorOptions>(options =>
            options.SuppressModelStateInvalidFilter = true);

        builder.Services.AddEndpointsApiExplorer();        
    }
}
