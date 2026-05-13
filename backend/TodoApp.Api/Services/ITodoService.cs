using TodoApp.Api.Models;

namespace TodoApp.Api.Services;

public interface ITodoService
{
    IEnumerable<TodoItem> GetAll();
    TodoItem Add(string title);
    bool Toggle(Guid id);
    bool Delete(Guid id);
}
