using Microsoft.AspNetCore.Mvc;
using Moq;
using TodoApp.Api.Controllers;
using TodoApp.Api.Models;
using TodoApp.Api.Services;
using TodoApp.Api.Tests.Builders;

namespace TodoApp.Api.Tests;

public class TodosControllerTests
{
    private readonly Mock<ITodoService> _mockService = new();
    private readonly TodosController _sut;

    public TodosControllerTests() => _sut = new TodosController(_mockService.Object);

    [Fact]
    public void GetAll_Returns200WithDtos()
    {
        var items = new[] { TodoItemBuilder.Build(title: "Test") };
        _mockService.Setup(s => s.GetAll()).Returns(items);

        var result = _sut.GetAll() as OkObjectResult;

        Assert.NotNull(result);
        Assert.Equal(200, result.StatusCode);
        var dtos = Assert.IsAssignableFrom<IEnumerable<TodoItemDto>>(result.Value);
        var dto = dtos.Single();
        Assert.Equal(items[0].Id, dto.Id);
        Assert.Equal(items[0].Title, dto.Title);
    }

    [Fact]
    public void Create_ValidTitle_Returns201WithDto()
    {
        var item = TodoItemBuilder.Build(title: "Test");
        _mockService.Setup(s => s.Add("Test")).Returns(item);

        var result = _sut.Create(new CreateTodoRequest("Test")) as CreatedAtActionResult;

        Assert.NotNull(result);
        Assert.Equal(201, result.StatusCode);
        var dto = Assert.IsType<TodoItemDto>(result.Value);
        Assert.Equal(item.Id, dto.Id);
        Assert.Equal(item.Title, dto.Title);
    }

    [Fact]
    public void Create_EmptyTitle_Returns400()
    {
        var result = _sut.Create(new CreateTodoRequest(""));
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Create_WhitespaceTitle_Returns400()
    {
        var result = _sut.Create(new CreateTodoRequest("   "));
        Assert.IsType<BadRequestObjectResult>(result);
    }

    [Fact]
    public void Toggle_KnownId_Returns204()
    {
        var id = Guid.NewGuid();
        _mockService.Setup(s => s.Toggle(id)).Returns(Result.Ok());
        Assert.IsType<NoContentResult>(_sut.Toggle(id));
    }

    [Fact]
    public void Toggle_UnknownId_Returns404()
    {
        _mockService.Setup(s => s.Toggle(It.IsAny<Guid>())).Returns(Result.Fail("Todo not found."));
        Assert.IsType<NotFoundObjectResult>(_sut.Toggle(Guid.NewGuid()));
    }

    [Fact]
    public void Delete_KnownId_Returns204()
    {
        var id = Guid.NewGuid();
        _mockService.Setup(s => s.Delete(id)).Returns(Result.Ok());
        Assert.IsType<NoContentResult>(_sut.Delete(id));
    }

    [Fact]
    public void Delete_UnknownId_Returns404()
    {
        _mockService.Setup(s => s.Delete(It.IsAny<Guid>())).Returns(Result.Fail("Todo not found."));
        Assert.IsType<NotFoundObjectResult>(_sut.Delete(Guid.NewGuid()));
    }
}
