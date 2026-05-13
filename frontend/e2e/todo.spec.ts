import { test, expect } from '@playwright/test';

test.describe('Todo App', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('adds a new todo item', async ({ page }) => {
    const input = page.getByTestId('todo-input');
    await input.fill('Write Playwright tests');
    await input.press('Enter');
    await expect(page.getByText('Write Playwright tests')).toBeVisible();
  });

  test('deletes a todo item', async ({ page }) => {
    const item = page.getByText('Buy groceries');
    await expect(item).toBeVisible();

    const deleteBtn = page.getByRole('button', { name: 'Delete Buy groceries' });
    await deleteBtn.click();

    await expect(item).not.toBeVisible();
  });

  test('toggles a todo item as complete', async ({ page }) => {
    const item = page.getByText('Read a book');
    await expect(item).toBeVisible();
    await expect(item).not.toHaveClass(/completed/);

    const checkbox = page.getByRole('checkbox', { name: /Toggle Read a book/ });
    await checkbox.click();

    await expect(item).toHaveClass(/completed/);
  });
});
