import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173';

test('should allow the user to sign in', async ({ page }) => {
  await page.goto(UI_URL);

  // get the sign in button and click it
  await page.getByRole('link', { name: 'Sign In' }).click();

  // expect the sign in heading to be visible
  await expect(page.getByRole('heading', { name: 'Sign In' })).toBeVisible();

  // fill in the email and password fields
  await page.locator("[name=email]").fill("1@1.com");
  await page.locator("[name=password]").fill("password123");

  // click the sign in button
  await page.getByRole("button", { name: "Sign In" }).click();

  // expect the sign out button on the header to be visible, toast, My Booking and My Hotels links to be visible
  await expect(page.getByText('Sign In successfully!')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Booking' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
