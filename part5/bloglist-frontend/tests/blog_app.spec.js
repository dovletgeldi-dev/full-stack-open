import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http:localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        name: "Dovlet Myratgeldiyev",
        username: "dovlet",
        password: "dovletgeldi",
      },
    });

    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();
    const username = await page.getByText("username");
    const password = await page.getByText("password");
    await expect(username).toBeVisible();
    await expect(password).toBeVisible();
  });

  test("Login succeeds with correct credentials", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();

    await page.getByTestId("username").fill("dovlet");
    await page.getByTestId("password").fill("dovletgeldi");

    await page.getByRole("button", { name: "login" }).click();

    await expect(
      page.getByText("Dovlet Myratgeldiyev logged-in")
    ).toBeVisible();
  });

  test("Login fails with wrong credentials", async ({ page }) => {
    await page.getByRole("button", { name: "login" }).click();

    await page.getByTestId("username").fill("dovlett");
    await page.getByTestId("password").fill("dovletgeldi");

    await page.getByRole("button", { name: "login" }).click();

    await expect(page.getByText("Dovlet Myratgeldiyev logged-in")).toBeHidden();
    await expect(page.getByText("Wrong username or password")).toBeVisible();
  });
});
