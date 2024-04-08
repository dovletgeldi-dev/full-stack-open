import { render, screen } from "@testing-library/react";
import { expect } from "vitest";
import Blog from "./Blog";

test("should render content", async () => {
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

  screen.debug(element);
  expect(element).toBeDefined();
});
