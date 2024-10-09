using Application.interfaces;
using Application.Queries.GetHistory.Dto;
using Application.Response;
using Domain.Entities;
using MediatR;

namespace Application.Queries.GetHistory
{
    public class GetHistoryQuery : IRequest<Response<List<GetHistoryResponse>>>
    {
        public string? MachineName {get;set;}
        public string? TrayName {get;set;}
        public DateTime? StartDate {get;set;}
        public DateTime? EndDate {get;set;}
        public bool? Result {get;set;}
    }

    public class GetHistoryHandler : IRequestHandler<GetHistoryQuery, Response<List<GetHistoryResponse>>>
    {
        private readonly IReadRepository<History> _history;
        public GetHistoryHandler(IReadRepository<History> history)
        {
            _history = history;
        }
        public async Task<Response<List<GetHistoryResponse>>> Handle(GetHistoryQuery request, CancellationToken cancellationToken)
        {
            var Response = new Response<List<GetHistoryResponse>>();
            var histories = await _history.ListAsync(
                a =>  (request.MachineName == null ? true : a.MachineName == request.MachineName) && 
                    (request.TrayName == null ? true : a.Tray == request.TrayName) && 
                    (request.StartDate == null ? true : a.CreatedDate >= request.StartDate) && 
                    (request.EndDate == null ? true : a.CreatedDate <= request.EndDate) && 
                    (request.Result == null ? true : a.Result == request.Result)
                , cancellationToken);
            Response.Result = new List<GetHistoryResponse>();
            foreach(var history in histories) 
            {
                Response.Result.Add(new GetHistoryResponse(){
                    MachineName = history.MachineName,
                    Tray = history.Tray,
                    Result = history.Result,
                    CreatedDate = history.CreatedDate
                });
            }
            return Response;
        }
    }
}