using Application.Queries.TestQuery.Dto;
using Application.Response;
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
        public async Task<Response<TestResponse>> Handle(TestQuery request, CancellationToken cancellationToken)
        {

            return new Response<TestResponse>();
        }
    }
}
