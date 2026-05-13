using TodoApp.Api.Models;

namespace TodoApp.Api.Services;

public class TodoService : ITodoService
{
    private readonly List<TodoItem> _todos =
    [
        new(Guid.NewGuid(), "Buy groceries", false, DateTimeOffset.UtcNow.AddMinutes(-3)),
        new(Guid.NewGuid(), "Read a book",   false, DateTimeOffset.UtcNow.AddMinutes(-2)),
        new(Guid.NewGuid(), "Go for a walk", false, DateTimeOffset.UtcNow.AddMinutes(-1)),
    ];
    private readonly object _lock = new();

    public IEnumerable<TodoItem> GetAll()
    {
        lock (_lock)
            return [.. _todos.OrderByDescending(t => t.CreatedAt)];
    }

    public TodoItem Add(string title)
    {
        var item = new TodoItem(Guid.NewGuid(), title.Trim(), false, DateTimeOffset.UtcNow);
        lock (_lock)
            _todos.Add(item);
        return item;
    }

    public bool Toggle(Guid id)
    {
        lock (_lock)
        {
            var index = _todos.FindIndex(t => t.Id == id);
            if (index < 0) return false;
            _todos[index] = _todos[index] with { Completed = !_todos[index].Completed };
            return true;
        }
    }

    public bool Delete(Guid id)
    {
        lock (_lock)
        {
            var item = _todos.FirstOrDefault(t => t.Id == id);
            if (item is null) return false;
            _todos.Remove(item);
            return true;
        }
    }
}
