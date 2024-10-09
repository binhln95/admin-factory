using Application.interfaces;
using Application.Queries.TestQuery.Dto;
using Application.Response;
using Domain.Entities;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Queries.TestQuery
{
    public class TestQuery : IRequest<Response<TestResponse>>
    {
    }

    public class TestHandler : IRequestHandler<TestQuery, Response<TestResponse>>
    {
        private readonly IReadRepository<DefineAuthority> _defineAuthority;
        public TestHandler(IReadRepository<DefineAuthority> defineAuthority) 
        {
            _defineAuthority = defineAuthority;
        }
        public async Task<Response<TestResponse>> Handle(TestQuery request, CancellationToken cancellationToken)
        {
            var data = await _defineAuthority.ListAsync(a => a != null, cancellationToken);
            return new Response<TestResponse>();
        }
    }
}
