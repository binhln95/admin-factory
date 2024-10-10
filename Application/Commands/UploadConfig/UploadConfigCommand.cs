using Application.interfaces;
using Domain.Entities;
using MediatR;
using System.IO;

namespace Application.Commands.UploadConfig
{
    public class UploadConfigCommand : IRequest<Response.Response>
    {
        public StreamReader Stream { get; set; }
    }

    public class UploadConfigHandler : IRequestHandler<UploadConfigCommand, Response.Response>
    {
        private int MachineOrder = 0;
        private int TrayOrder = 1;
        private readonly IRepository<Configuration> _configuration;
        public UploadConfigHandler(IRepository<Configuration> configuration)
        {
            _configuration = configuration;
        }

        public async Task<Response.Response> Handle(UploadConfigCommand request, CancellationToken cancellationToken)
        {
            List<Configuration> configuration = new List<Configuration>();
            int id = 1;
            while (!request.Stream.EndOfStream)
            {
                var line = await request.Stream.ReadLineAsync();
                var values = line.Split(',');
                configuration.Add(new Configuration()
                {
                    Id = id,
                    MachineName = values[MachineOrder],
                    Tray = values[TrayOrder],
                    CreatedDate = DateTime.Now,
                    UpdatedDate = DateTime.Now,
                });
                id++;
            }
            try {
                await _configuration.RawQuery("TRUNCATE TABLE ADMIN_CONFIGURATION", cancellationToken);
            } catch (Exception ex) {

            }
            await _configuration.AddRangeAsync(configuration, cancellationToken);
            return new Response.Response(){ IsSuccess= true};
        }
    }
}
