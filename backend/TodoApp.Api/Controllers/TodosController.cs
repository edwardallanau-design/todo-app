using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController(ITodoService service) : ControllerBase
{
    [HttpGet]
    public IActionResult GetAll() => Ok(service.GetAll());

    [HttpPost]
    public IActionResult Create([FromBody] CreateTodoRequest request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest("Title is required.");
        var item = service.Add(request.Title);
        return Created($"/api/todos/{item.Id}", item);
    }

    [HttpPatch("{id:guid}")]
    public IActionResult Toggle(Guid id) =>
        service.Toggle(id) ? NoContent() : NotFound();

    [HttpDelete("{id:guid}")]
    public IActionResult Delete(Guid id) =>
        service.Delete(id) ? NoContent() : NotFound();
}

public record CreateTodoRequest(string Title);
