using TodoApp.Api.Models;

namespace TodoApp.Api.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();
    TodoItem Add(string title);
    Result Toggle(Guid id);
    Result Delete(Guid id);
}
