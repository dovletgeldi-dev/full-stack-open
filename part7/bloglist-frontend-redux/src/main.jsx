import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./store";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/NotFoundPage";
import Users from "./components/Users";
import UsersBlogs from "./components/UsersBlogs";
import BlogDetails from "./components/BlogDetails";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "users", element: <Users /> },
      { path: "users/:userId", element: <UsersBlogs /> },
      { path: "blogs", element: <BlogList /> },
      { path: "blogs/:blogId", element: <BlogDetails /> },
    ],
  },
  { path: "login", element: <LoginForm /> },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
