import { Link } from "react-router-dom";

const Blog = ({ blog }) => {
  return (
    <div
      style={{ border: "2px solid black", margin: "1rem 0", padding: "1rem" }}
      className="blog"
    >
      <Link to={`/blogs/${blog.id}`}>
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
