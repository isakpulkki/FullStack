import { useState } from 'react';

const Blog = ({ blog, handleLike }) => {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <br></br>
        URL: {blog.url}
        <br></br>
        Likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>
          Like
        </button>
        <br></br>
        Author: {blog.author}
        <br></br>
        Added by: {blog.user.name}
        <div>
          <button onClick={() => toggleVisibility()}>
            Hide
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title}</div>
        <div>
          <button onClick={() => toggleVisibility()}>
            Show
          </button>
        </div>
      </div>
    );
  }
};

export default Blog;
