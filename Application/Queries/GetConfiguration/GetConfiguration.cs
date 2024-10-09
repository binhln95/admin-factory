using Application.interfaces;
using Application.Queries.GetConfiguration.Dto;
using Application.Response;
using Domain.Entities;
using MediatR;

namespace Application.Queries.GetConfiguration 
{
    public class GetConfigurationQuery : IRequest<Response<List<GetConfigurationResponse>>> 
    {
        public List<string>? MachineNameWithout {get;set;}
    }

    public class GetConfigurationHandler : IRequestHandler<GetConfigurationQuery, Response<List<GetConfigurationResponse>>>
    {
        private readonly IReadRepository<Configuration> _configuration;
        public GetConfigurationHandler(IReadRepository<Configuration> configuration) 
        {
            _configuration = configuration;
        }
        public async Task<Response<List<GetConfigurationResponse>>> Handle(GetConfigurationQuery request, CancellationToken cancellationToken)
        {
            var Response = new Response<List<GetConfigurationResponse>>();
            try
            {
                List<Configuration> configs = request.MachineNameWithout == null 
                    ? await _configuration.GetAll(cancellationToken)
                    : await _configuration.ListAsync(a => !request.MachineNameWithout.Contains(a.MachineName) , cancellationToken);
                Response.Result = new List<GetConfigurationResponse>();
                foreach(var config in configs) 
                {
                    Response.Result.Add(new GetConfigurationResponse(){
                        MachineName = config.MachineName,
                        Tray = config.Tray
                    });
                }
            } catch (Exception ex) 
            {

            }
            return Response;
        }
    }
}