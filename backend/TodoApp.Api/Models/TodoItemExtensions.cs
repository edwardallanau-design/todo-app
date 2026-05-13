namespace TodoApp.Api.Models;

public static class TodoItemExtensions
{
    public static TodoItemDto ToDto(this TodoItem item) =>
        new(item.Id, item.Title, item.Completed, item.CreatedAt);
}
