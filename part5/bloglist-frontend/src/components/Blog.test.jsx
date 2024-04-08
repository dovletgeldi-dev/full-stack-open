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
  const button = screen.getByText(/view/i);
  await user.click(button);

  const url = screen.getByText("https://fullstackopen.com/");
  const likes = screen.getByText(/0/i);

  screen.debug();

  expect(url).toBeDefined();
  expect(likes).toBeDefined();
});
