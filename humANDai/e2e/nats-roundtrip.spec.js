import { test, expect } from '@playwright/test';

test('app sends test message to backend and receives response', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Send Test Message' }).click();
  await expect(page.getByText('Response: testReceived')).toBeVisible();
});
