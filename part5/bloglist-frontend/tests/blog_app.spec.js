import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";
import { createNote, loginWith } from "./helper";

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

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "dovlet", "dovletgeldi");
    });

    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();

      const textboxes = await page.getByRole("textbox").all();

      await textboxes[0].fill("Vue 101");
      await textboxes[1].fill("Dan Abramov");
      await textboxes[2].fill("https://react.dev/");
      await textboxes[3].fill("8");

      await page.getByRole("button", { name: "create" }).click();

      await expect(page.getByTestId("titleOutput")).toHaveText(/Vue 101/);
      await expect(page.getByTestId("authorOutput")).toHaveText(/Dan Abramov/);
      await expect(page.getByText("https://react.dev/")).toBeHidden();
      await expect(page.getByText("8")).toBeHidden();

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("https://react.dev/")).toBeVisible();
      await expect(page.getByText("8")).toBeVisible();
    });

    test("blog can be edited", async ({ page }) => {
      await createNote(
        page,
        "Angular",
        "Google Dev",
        "https://angular.com/",
        "1"
      );

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("1")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("2")).toBeVisible();
    });
  });
});
