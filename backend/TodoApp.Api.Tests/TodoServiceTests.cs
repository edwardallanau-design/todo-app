using TodoApp.Api.Services;

namespace TodoApp.Api.Tests;

public class TodoServiceTests
{
    private readonly TodoService _sut = new();

    [Fact]
    public void GetAll_ReturnsSeededItems()
    {
        var items = _sut.GetAll();
        Assert.Equal(3, items.Count());
    }

    [Fact]
    public void GetAll_ReturnsNewestFirst()
    {
        var items = _sut.GetAll().ToList();
        Assert.True(items[0].CreatedAt >= items[1].CreatedAt);
    }

    [Fact]
    public void Add_IncreasesCountAndReturnsItem()
    {
        var before = _sut.GetAll().Count();
        var item = _sut.Add("New task");
        Assert.Equal(before + 1, _sut.GetAll().Count());
        Assert.Equal("New task", item.Title);
        Assert.False(item.Completed);
    }

    [Fact]
    public void Add_TrimsWhitespace()
    {
        var item = _sut.Add("  Trimmed  ");
        Assert.Equal("Trimmed", item.Title);
    }

    [Fact]
    public void Toggle_FlipsCompleted()
    {
        var item = _sut.Add("Toggle me");
        var result = _sut.Toggle(item.Id);
        Assert.True(result);
        Assert.True(_sut.GetAll().First(t => t.Id == item.Id).Completed);
    }

    [Fact]
    public void Toggle_UnknownId_ReturnsFalse()
    {
        Assert.False(_sut.Toggle(Guid.NewGuid()));
    }

    [Fact]
    public void Delete_RemovesItem()
    {
        var item = _sut.Add("Delete me");
        var before = _sut.GetAll().Count();
        var result = _sut.Delete(item.Id);
        Assert.True(result);
        Assert.Equal(before - 1, _sut.GetAll().Count());
    }

    [Fact]
    public void Delete_UnknownId_ReturnsFalse()
    {
        Assert.False(_sut.Delete(Guid.NewGuid()));
    }
}
