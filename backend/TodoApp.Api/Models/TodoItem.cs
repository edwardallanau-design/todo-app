namespace TodoApp.Api.Models;

public record TodoItem(
    Guid Id,
    string Title,
    bool Completed,
    DateTimeOffset CreatedAt
);
