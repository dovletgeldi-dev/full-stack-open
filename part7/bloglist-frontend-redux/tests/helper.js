const loginWith = async (page, username, password) => {
  await page.getByRole("button", { name: "login" }).click();
  await page.getByTestId("username").fill(username);
  await page.getByTestId("password").fill(password);
  await page.getByRole("button", { name: "login" }).click();
};

const createNote = async (page, title, author, url, likes) => {
  await page.getByRole("button", { name: "new blog" }).click();

  const textboxes = await page.getByRole("textbox").all();

  await textboxes[0].fill(title);
  await textboxes[1].fill(author);
  await textboxes[2].fill(url);
  await textboxes[3].fill(likes);

  await page.getByRole("button", { name: "create" }).click();
};

export { loginWith, createNote };
