using TodoApp.Api.Models;

namespace TodoApp.Api.Tests.Builders;

public static class TodoItemBuilder
{
    public static TodoItem Build(
        Guid? id = null,
        string title = "Test Todo",
        bool completed = false,
        DateTimeOffset? createdAt = null) =>
        new(
            id ?? Guid.NewGuid(),
            title,
            completed,
            createdAt ?? DateTimeOffset.UtcNow);
}
