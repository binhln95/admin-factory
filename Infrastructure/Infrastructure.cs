using Infrastructure.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;

namespace Infrastructure
{
    public static class Infrastructure
    {
        public static void AddInfrastructure(this IServiceCollection services)
        {
            var serverVersion = new MySqlServerVersion(new Version(8, 0, 29));
            //string connectString = "SERVER=172.16.100.3;DATABASE=TRACKING_SYSTEM;UID=admin;PASSWORD=tsadmin;charset=utf8;";
            //services.AddDbContext<AdminContext>(
            //    dbContextOptions => dbContextOptions
            //        .UseMySql(connectString, serverVersion)
            //        .LogTo(Console.WriteLine, LogLevel.Information)
            //        .EnableSensitiveDataLogging()
            //        .EnableDetailedErrors()
            //);
        }
    }
}
