using TodoApp.Api.Configuration;
using TodoApp.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<CorsSettings>(builder.Configuration.GetSection("Cors"));
builder.Services.AddControllers();
builder.Services.AddSingleton<ITodoService, TodoService>();

var corsSettings = builder.Configuration.GetSection("Cors").Get<CorsSettings>()
    ?? new CorsSettings();

builder.Services.AddCors(options =>
    options.AddPolicy("AllowAngularDev", policy =>
        policy.WithOrigins(corsSettings.AllowedOrigin)
              .AllowAnyHeader()
              .AllowAnyMethod()));

var app = builder.Build();

app.UseCors("AllowAngularDev");
app.MapControllers();
app.Run();
