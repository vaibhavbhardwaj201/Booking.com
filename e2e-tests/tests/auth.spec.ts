import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173';


// Testing the sign in functionality
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


// Testing the functionality to create a new user
test('should allow the user to sign up', async ({ page }) => {

  const testEmail = `test_register_${Math.floor(Math.random() * 90000) + 10000}@test.com`

  await page.goto(UI_URL);

  // get the sign in button and click it
  await page.getByRole('link', { name: 'Sign In'}).click();

  // get the sign up link and click it
  await page.getByRole('link', { name: 'Sign Up'}).click();

  // expect the heading "Create an account" to be visible
  await expect(page.getByRole('heading', { name: 'Create an account'})).toBeVisible();

  // fill in the fields correctly and click the Register button
  await page.locator("[name=firstName]").fill("testFirstName");
  await page.locator("[name=lastName]").fill("testLastName");
  await page.locator("[name=email]").fill(testEmail);
  await page.locator("[name=password]").fill("password123");
  await page.locator("[name=confirmPassword]").fill("password123");

  // click the Register button
  await page.getByRole("button", { name: "Register" }).click();

  // expect the toast to be visible, My Booking and My Hotels links to be visible and the Sign Out button to be visible
  await expect(page.getByText('Account created successfully!')).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Booking' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'My Hotels' })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Sign Out' })).toBeVisible();
});
