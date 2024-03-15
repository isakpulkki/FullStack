const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => {
    return totalLikes + blog.likes;
  }, 0);
};

const favoriteBlog = (blogs) => {
  return blogs.reduce(
    (favoriteBlog, blog) => {
      if (blog.likes > favoriteBlog.likes) {
        return {
          title: blog.title,
          author: blog.author,
          likes: blog.likes,
        };
      }
    },
    { likes: 0 }
  );
};

const mostBlogs = (blogs) => {
  const grouped = lodash.groupBy(blogs, "author");
  const values = lodash.values(grouped);
  const blogsByAuthor = values.map((groupedBlogs) => ({
    author: groupedBlogs[0].author,
    blogs: groupedBlogs.length,
  }));
  return blogsByAuthor.reduce(
    (mostBlogs, blog) => {
      if (blog.blogs > mostBlogs.blogs) {
        return blog;
      }
    },
    { blogs: 0 }
  );
};

const mostLikes = (blogs) => {
  const grouped = lodash.groupBy(blogs, "author");
  const values = lodash.values(grouped);
  const likesByAuthor = values.map((groupedBlogs) => ({
    author: groupedBlogs[0].author,
    likes: lodash.sumBy(groupedBlogs, "likes"),
  }));
  return likesByAuthor.reduce(
    (mostLikes, blog) => {
      if (blog.likes > mostLikes.likes) {
        return blog;
      }
    },
    { likes: 0 }
  );
};

const initialBlogs = [
  {
    title: "Kissakirja",
    author: "Dani Huusanen",
    url: "www.kissakirja.fi",
    likes: 3,
  },
  {
    title: "Koirakirja",
    author: "Oskari Puusanen",
    url: "www.koirakirja.fi",
    likes: 1,
  },
];

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
  initialBlogs
};
