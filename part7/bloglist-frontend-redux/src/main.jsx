import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Users from "./components/Users";
import UsersBlogs from "./components/UsersBlogs";
import BlogDetails from "./components/BlogDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  { path: "users", element: <Users /> },
  { path: "users/:userId", element: <UsersBlogs /> },
  { path: "blogs/:blogId", element: <BlogDetails /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
