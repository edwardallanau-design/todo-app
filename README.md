# Todo App

A full-stack Todo list application built with Angular 21 and .NET 9 Web API.

## Features

- View all todo items
- Add new todo items
- Mark items as complete / incomplete
- Delete items

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | 20+ |
| npm | 10+ |
| .NET SDK | 9.0 |
| Angular CLI | 21+ |

Install Angular CLI globally if you don't have it:
```bash
npm install -g @angular/cli
```

## Running the App

**Backend** (Terminal 1):
```bash
cd backend/TodoApp.Api
dotnet run --launch-profile http
```
API is available at `http://localhost:5000`.

**Frontend** (Terminal 2):
```bash
cd frontend
npm install
ng serve
```
App is available at `http://localhost:4200`.

## Running Unit Tests

**Backend:**
```bash
cd backend
dotnet test
```

**Frontend:**
```bash
cd frontend
ng test
```

## Running E2E Tests

Playwright starts both servers automatically — no manual setup required.

```bash
cd frontend
npx playwright install chromium   # first time only
npx playwright test
```

To view the HTML report after a run:
```bash
npx playwright show-report
```

## Project Structure

```
todoapp/
├── backend/
│   ├── TodoApp.Api/          # .NET 9 Web API (controllers, services, models)
│   └── TodoApp.Api.Tests/    # xUnit + Moq unit tests
└── frontend/
    ├── src/app/
    │   ├── core/             # Shared models and services
    │   └── features/todos/   # Todo feature components
    └── e2e/                  # Playwright end-to-end tests
```
