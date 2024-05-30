import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.login);

  return (
    <div
      style={{ border: "2px solid black", margin: "1rem 0", padding: "1rem" }}
      className="blog"
    >
      <Link to={`blogs/${blog.id}`}>
        <div>
          <span data-testid="titleOutput">{blog.title}</span>{" "}
          <span
            style={{ fontWeight: "bold", fontStyle: "italic" }}
            data-testid="authorOutput"
          >
            {blog.author}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default Blog;
