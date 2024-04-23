import { test, expect } from "@playwright/test";
import { text } from "stream/consumers";
import { createNote, loginWith } from "./helper";

test.describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("/api/testing/reset");

    await request.post("/api/users", {
      data: {
        name: "Dovlet Myratgeldiyev",
        username: "dovlet",
        password: "dovletgeldi",
      },
    });

    await request.post("/api/users", {
      data: {
        name: "Kerim Arazov",
        username: "kerim",
        password: "araz",
      },
    });

    await page.goto("/");
  });

  // test("Login form is shown", async ({ page }) => {
  //   await page.getByRole("button", { name: "login" }).click();
  //   const username = await page.getByText("username");
  //   const password = await page.getByText("password");
  //   await expect(username).toBeVisible();
  //   await expect(password).toBeVisible();
  // });

  // test("Login succeeds with correct credentials", async ({ page }) => {
  //   await page.getByRole("button", { name: "login" }).click();

  //   await page.getByTestId("username").fill("dovlet");
  //   await page.getByTestId("password").fill("dovletgeldi");

  //   await page.getByRole("button", { name: "login" }).click();

  //   await expect(
  //     page.getByText("Dovlet Myratgeldiyev logged-in")
  //   ).toBeVisible();
  // });

  // test("Login fails with wrong credentials", async ({ page }) => {
  //   await page.getByRole("button", { name: "login" }).click();

  //   await page.getByTestId("username").fill("dovlett");
  //   await page.getByTestId("password").fill("dovletgeldi");

  //   await page.getByRole("button", { name: "login" }).click();

  //   await expect(page.getByText("Dovlet Myratgeldiyev logged-in")).toBeHidden();
  //   await expect(page.getByText("Wrong username or password")).toBeVisible();
  // });

  test.describe("When logged in", () => {
    test.beforeEach(async ({ page }) => {
      await loginWith(page, "dovlet", "dovletgeldi");
    });

    test("a new blog can be created", async ({ page }) => {
      await createNote(
        page,
        "Vue 101",
        "Dan Abramov",
        "https://react.dev/",
        "8"
      );

      await page.waitForSelector(
        '[data-testid="titleOutput"]:has-text("Vue 101")'
      );

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
        "Vue 101",
        "Dan Abramov",
        "https://react.dev/",
        "8"
      );

      await page.waitForSelector(
        '[data-testid="titleOutput"]:has-text("Vue 101")'
      );

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("8")).toBeVisible();

      await page.getByRole("button", { name: "like" }).click();

      await expect(page.getByText("9")).toBeVisible();
    });

    test("blog can only be deleted by user who added it", async ({ page }) => {
      await createNote(
        page,
        "Vue 101",
        "Dan Abramov",
        "https://react.dev/",
        "8"
      );

      await page.waitForSelector(
        '[data-testid="titleOutput"]:has-text("Vue 101")'
      );

      await page.evaluate(() => {
        window.confirm = () => true;
      });

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("remove")).toBeVisible();

      await page.getByRole("button", { name: "remove" }).click();

      await expect(
        page.getByText("Successfully removed Vue 101 by Dan Abramov from blogs")
      ).toBeVisible();

      await expect(page.getByText("Vue 101")).toBeHidden();
    });

    test("user who did not add the blog cannot see the blog's delete button", async ({
      page,
    }) => {
      await createNote(
        page,
        "Vue 101",
        "Dan Abramov",
        "https://react.dev/",
        "8"
      );

      await page.waitForSelector(
        '[data-testid="titleOutput"]:has-text("Vue 101")'
      );

      await page.getByRole("button", { name: "logout" }).click();

      await loginWith(page, "kerim", "araz");

      await page.evaluate(() => {
        window.confirm = () => true;
      });

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("remove")).toBeHidden();
    });

    test("user who added the blog sees the blog's delete button", async ({
      page,
    }) => {
      await createNote(
        page,
        "Vue 101",
        "Dan Abramov",
        "https://react.dev/",
        "8"
      );

      await page.waitForSelector(
        '[data-testid="titleOutput"]:has-text("Vue 101")'
      );

      await page.evaluate(() => {
        window.confirm = () => true;
      });

      await page.getByRole("button", { name: "view" }).click();

      await expect(page.getByText("remove")).toBeVisible();
    });
  });
});
