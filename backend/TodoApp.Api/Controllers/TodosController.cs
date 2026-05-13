using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(ITodoService service) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(service.GetAll().Select(t => t.ToDto()).ToList());

    [HttpPost]
    public IActionResult Create([FromBody] CreateTodoRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest("Title is required.");
        var dto = service.Add(request.Title).ToDto();
        return CreatedAtAction(nameof(GetAll), new { id = dto.Id }, dto);
    }

    [HttpPatch("{id:guid}")]
    public IActionResult Toggle(Guid id)
    {
        var result = service.Toggle(id);
        return result.IsSuccess ? NoContent() : NotFound(result.Error);
    }

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id)
    {
        var result = service.Delete(id);
        return result.IsSuccess ? NoContent() : NotFound(result.Error);
    }
}

public record CreateTodoRequest(string Title);
