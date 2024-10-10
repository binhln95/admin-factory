using Application.Commands.Compare;
using Application.Commands.UploadConfig;
using Application.Queries.GetConfiguration;
using Application.Queries.GetConfiguration.Dto;
using Application.Queries.GetHistory;
using Application.Queries.GetHistory.Dto;
using Application.Queries.TestQuery;
using Application.Queries.TestQuery.Dto;
using Application.Response;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using System.Text;

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

        [HttpGet]
        [ProducesResponseType(typeof(Response<GetHistoryResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> GetHistory([FromQuery] GetHistoryQuery query)
        {
            var res = await _mediator.Send(query);

            return Ok(res);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Response<GetHistoryResponse>), StatusCodes.Status200OK)]
        public async Task<IActionResult> Compare([FromBody] CompareCommand command)
        {
            var res = await _mediator.Send(command);

            return Ok(res);
        }

        [HttpPost]
        [ProducesResponseType(typeof(Response), StatusCodes.Status200OK)]
        public async Task<IActionResult> UploadFile(IFormFile file)
        {
            var csvData = new List<string[]>();
            var res = new Response();
            using (StreamReader stream = new StreamReader(file.OpenReadStream(), Encoding.UTF8))
            {
                res = await _mediator.Send(new UploadConfigCommand()
                {
                    Stream = stream
                });
                stream.Close();
            }
            return Ok(res);
        }
    }
}
