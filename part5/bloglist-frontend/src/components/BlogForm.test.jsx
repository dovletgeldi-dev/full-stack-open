import { render, screen } from "@testing-library/react";
import { expect, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import BlogForm from "./BlogForm";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlog = vi.fn();

  const user = {
    name: "Test User",
    id: "213",
  };

  render(<BlogForm user={user} createBlog={createBlog} />);

  // Fill out the form
  const titleInput = screen.getByPlaceholderText("title");
  const authorInput = screen.getByPlaceholderText("author");
  const urlInput = screen.getByPlaceholderText("url");
  const likesInput = screen.getByPlaceholderText("likes");

  await userEvent.type(titleInput, "New Blog Title");
  await userEvent.type(authorInput, "New Blog Author");
  await userEvent.type(urlInput, "https://newblog.com");
  await userEvent.clear(likesInput);
  await userEvent.type(likesInput, "10");

  // Submit the form
  const submitButton = screen.getByText("create");
  await userEvent.click(submitButton);

  // Check that createBlog was called with the correct arguments
  expect(createBlog).toHaveBeenCalledTimes(1);
  expect(createBlog).toHaveBeenCalledWith({
    title: "New Blog Title",
    author: "New Blog Author",
    url: "https://newblog.com",
    likes: "10",
    user: user.id, // Assuming the createBlog function expects the user's id
  });
});
