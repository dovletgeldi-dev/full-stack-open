const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  } else if (blogs.length === 1) {
    return blogs[0].likes;
  } else {
    return blogs
      .map((blog) => blog.likes)
      .reduce((sum, likes) => sum + likes, 0);
  }
};

const favoriteBlog = (blogs) => {
  return blogs.reduce((prevBlog, currentBlog) => {
    return prevBlog.likes > currentBlog.likes ? prevBlog : currentBlog;
  });
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
