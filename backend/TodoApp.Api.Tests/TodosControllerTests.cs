using Microsoft.AspNetCore.Mvc;
using Moq;
using TodoApp.Api.Controllers;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoApp.Api.Tests;

public class TodosControllerTests
{
    private readonly Mock<ITodoService> _mockService = new();
    private readonly TodosController _sut;

    public TodosControllerTests() => _sut = new TodosController(_mockService.Object);

    [Fact]
    public void GetAll_Returns200WithItems()
    {
        var items = new[] { new TodoItem(Guid.NewGuid(), "Test", false, DateTimeOffset.UtcNow) };
        _mockService.Setup(s => s.GetAll()).Returns(items);

        var result = _sut.GetAll() as OkObjectResult;

        Assert.NotNull(result);
        Assert.Equal(200, result.StatusCode);
        Assert.Equal(items, result.Value);
    }

    [Fact]
    public void Create_ValidTitle_Returns201WithItem()
    {
        var item = new TodoItem(Guid.NewGuid(), "Test", false, DateTimeOffset.UtcNow);
        _mockService.Setup(s => s.Add("Test")).Returns(item);

        var result = _sut.Create(new CreateTodoRequest("Test")) as CreatedResult;

        Assert.NotNull(result);
        Assert.Equal(201, result.StatusCode);
        Assert.Equal(item, result.Value);
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
        _mockService.Setup(s => s.Toggle(id)).Returns(true);
        Assert.IsType<NoContentResult>(_sut.Toggle(id));
    }

    [Fact]
    public void Toggle_UnknownId_Returns404()
    {
        _mockService.Setup(s => s.Toggle(It.IsAny<Guid>())).Returns(false);
        Assert.IsType<NotFoundResult>(_sut.Toggle(Guid.NewGuid()));
    }

    [Fact]
    public void Delete_KnownId_Returns204()
    {
        var id = Guid.NewGuid();
        _mockService.Setup(s => s.Delete(id)).Returns(true);
        Assert.IsType<NoContentResult>(_sut.Delete(id));
    }

    [Fact]
    public void Delete_UnknownId_Returns404()
    {
        _mockService.Setup(s => s.Delete(It.IsAny<Guid>())).Returns(false);
        Assert.IsType<NotFoundResult>(_sut.Delete(Guid.NewGuid()));
    }
}
