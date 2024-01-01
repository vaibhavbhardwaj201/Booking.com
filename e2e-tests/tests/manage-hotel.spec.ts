import path from 'path';

import { test, expect } from '@playwright/test';

const UI_URL = 'http://localhost:5173';


// Run this test before each test to sign in
test.beforeEach(async ({ page }) => {
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
});

// Testing the functionality to addd hotel in db
test('should allow user to add a new hotel', async ({ page }) => {
    // Go to add hotel page
    await page.goto(`${UI_URL}/add-hotel`);

    // Fill in the form and add a new hotel
    await page.locator("[name=name]").fill("Test Hotel");
    await page.locator("[name=city]").fill("Test City");
    await page.locator("[name=country]").fill("Test Country");
    await page.locator("[name=description]").fill("Test Description, this is description");
    await page.locator("[name=pricePerNight]").fill("100");
    // dropdown
    await page.selectOption("select[name=starRating]", "5");
    // Radio button to select one option from many
    await page.getByText("Budget").click();
    // checkbox to select multiple options
    await page.getByText("Free Wifi").check();
    await page.getByText("Parking").check();
    await page.getByText("Spa").check();
    // Select guest number
    await page.locator("[name=adultCount]").fill("2");
    await page.locator("[name=childCount]").fill("1");


    // Upload image
    await page.setInputFiles("[name='imageFiles']", [
        path.join(__dirname, "files", "1.jpeg"),
        path.join(__dirname, "files", "2.png"),
        path.join(__dirname, "files", "3.jpeg"),
        path.join(__dirname, "files", "4.png"),
        path.join(__dirname, "files", "5.jpeg"),
    ]);

    // click the save button
    await page.getByRole("button", { name: "Save" }).click();

    // expect the hotel to be added successfully and expect the text "Hotel added successfully!
    await expect(page.getByText('Hotel added successfully!')).toBeVisible();

});


// Test to check if front end can get the hotel list from backend
test('should allow user to get hotel list', async ({ page }) => {
    await page.goto(`${UI_URL}/my-hotels`);

    // expect the hotel list to be visible
    await expect(page.getByRole('link', { name: "Add Hotel" })).toBeVisible();

    await expect(page.getByText('Taj Hotel')).toBeVisible();
    await expect(page.getByText("This is vilnisu")).toBeVisible();
    await expect(page.getByText('Vilnius, LITHUANIA')).toBeVisible();
    await expect(page.getByText('Ski Resort')).toBeVisible();
    await expect(page.getByText('€472 per night')).toBeVisible();
    await expect(page.getByText('1 adults, 0 children')).toBeVisible();
    await expect(page.getByText('3 Star Ratings')).toBeVisible();

    await expect(page.getByRole('link', { name: "View Details" })).toBeVisible();


});