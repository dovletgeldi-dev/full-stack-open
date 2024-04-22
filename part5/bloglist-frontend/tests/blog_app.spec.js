import { test, expect } from "@playwright/test";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    const username = await page.getByText("username");
    const password = await page.getByText("password");
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
    await page.getByRole("button", { name: "cancel" }).click();
    await expect(username).toBeHidden();
    await expect(password).toBeHidden();
  });
});
