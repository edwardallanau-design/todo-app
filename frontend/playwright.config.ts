import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  fullyParallel: false,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:4200',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: [
    {
      command: 'dotnet run --project ../backend/TodoApp.Api/TodoApp.Api.csproj --launch-profile http',
      url: 'http://localhost:5000/api/todos',
      reuseExistingServer: !process.env['CI'],
      timeout: 30_000,
    },
    {
      command: 'npx ng serve',
      url: 'http://localhost:4200',
      reuseExistingServer: !process.env['CI'],
      timeout: 60_000,
    },
  ],
});
