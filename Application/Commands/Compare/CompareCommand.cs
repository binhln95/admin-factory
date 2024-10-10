using Application.interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Commands.Compare
{
    public class CompareCommand : IRequest<Response.Response<bool>>
    {
        public string MachineName { get; set; }
        public string TrayName { get; set; }
    }

    public class CompareHandler : IRequestHandler<CompareCommand, Response.Response<bool>>
    {
        private readonly IRepository<History> _history;
        private readonly IReadRepository<Configuration> _configuration;
        public CompareHandler(IRepository<History> history, IReadRepository<Configuration> configuration)
        {
            _history = history;
            _configuration = configuration;
        }
        public async Task<Response.Response<bool>> Handle(CompareCommand request, CancellationToken cancellationToken)
        {
            var Response = new Response.Response<bool>();
            var res = await _configuration.AnyAsync(a => a.Tray == request.TrayName && a.MachineName == request.MachineName, cancellationToken);
            var history = new History();
            history.MachineName = request.MachineName;
            history.Tray = request.TrayName;
            history.Result = res;
            history.CreatedDate = DateTime.Now;
            history.UpdatedDate = DateTime.Now;
            await _history.AddAsync(history);
            Response.IsSuccess = true;
            Response.Result = res;
            return Response;
        }
    }
}
