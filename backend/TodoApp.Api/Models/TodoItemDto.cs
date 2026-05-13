namespace TodoApp.Api.Models;

public record TodoItemDto(Guid Id, string Title, bool Completed, DateTimeOffset CreatedAt);
