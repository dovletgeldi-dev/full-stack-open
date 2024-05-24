import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import Blog from "./Blog";
import userEvent from "@testing-library/user-event";

test("should render blog's title and author only", async () => {
  const blog = {
    title: "Title of titles",
    author: "John Doe",
    url: "https://fullstackopen.com/",
    user: {
      name: "Test User",
    },
  };

  render(<Blog blog={blog} />);

  const element = screen.getByText(/Title of titles/i);

  screen.debug();

  expect(element).toBeDefined();
});

test("should render all blog's details when button is clicked", async () => {
  const blog = {
    title: "Title of titles",
    author: "John Doe",
    url: "https://fullstackopen.com/",
    likes: 0,
    user: {
      name: "Test User",
    },
  };

  const mockHandler = vi.fn();

  render(<Blog blog={blog} toggleVisibility={mockHandler} />);

  const user = userEvent.setup();
  const button = screen.getByText("view");
  await user.click(button);

  const url = screen.getByText("https://fullstackopen.com/");
  const likes = screen.getByText(/0/i);

  screen.debug();

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});

test("should ensure that if the like button is clicked twice, the event handler the component received as props is called twice", async () => {
  const mockHandler = vi.fn();

  const blog = {
    title: "Title of titles",
    author: "John Doe",
    url: "https://fullstackopen.com/",
    likes: 15,
    user: {
      name: "Test User",
    },
  };

  const { container } = render(
    <Blog blog={blog} toggleVisibility={mockHandler} handleLike={mockHandler} />
  );

  const clickView = userEvent.setup();
  const buttonView = screen.getByText("view");
  await clickView.click(buttonView);

  const clickLike = userEvent.setup();
  const buttonLike = container.querySelector("#like-button");

  await clickLike.click(buttonLike);
  await clickLike.click(buttonLike);

  screen.debug();

  console.log(mockHandler.mock.calls);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
