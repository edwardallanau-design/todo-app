namespace TodoApp.Api.Models;

public record Result
{
    private Result(bool isSuccess, string? error = null)
    {
        IsSuccess = isSuccess;
        Error = error;
    }

    public bool IsSuccess { get; init; }
    public string? Error { get; init; }

    public static Result Ok() => new(true);
    public static Result Fail(string error) => new(false, error);
}
