using Application.Queries.GetConfiguration;
using Application.Queries.GetConfiguration.Dto;
using Application.Queries.TestQuery;
using Application.Queries.TestQuery.Dto;
using Application.Response;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AdminApi.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class AdminController : Controller
    {
        private readonly IMediator _mediator;
        public AdminController(IMediator mediator)
        {
            _mediator = mediator;
        }

        [HttpGet]
        [ProducesResponseType(typeof(Response<TestResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Test()
        {
            var res = await _mediator.Send(new TestQuery());

            return Ok(res);
        }

        [HttpGet]
        [ProducesResponseType(typeof(Response<GetConfigurationResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetConfiguration([FromQuery]GetConfigurationQuery query)
        {
            var res = await _mediator.Send(query);

            return Ok(res);
        }
    }
}
