using Application.Queries.TestQuery;
using Microsoft.Extensions.DependencyInjection;
using System.Reflection;
using MediatR;
using System.Collections.Generic;

namespace Application
{
    public static class Application
    {
        public static void AddApplication(this IServiceCollection services)
        {
            services.AddMediatR(typeof(TestQuery).GetTypeInfo().Assembly);
        }
    }
}
