import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, handleLike, handleDelete }) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title}
        <br></br>
        URL: {blog.url}
        <br></br>
        Likes: {blog.likes}
        <button onClick={() => handleLike(blog)}>Like</button>
        <br></br>
        Author: {blog.author}
        <br></br>
        Added by: {blog.user.name}
        {handleDelete && (
          <div>
            <button onClick={() => handleDelete(blog.id)}>Delete</button>
          </div>
        )}
        <div>
          <button onClick={() => toggleVisibility()}>Hide</button>
        </div>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>{blog.title}</div>
        <div>
          <button onClick={() => toggleVisibility()}>Show</button>
        </div>
      </div>
    )
  }
}
Blog.propTypes = {
  handleLike: PropTypes.func.isRequired,
  handleDelete: PropTypes.func
}

export default Blog
