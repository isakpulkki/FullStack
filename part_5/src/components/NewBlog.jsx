import { useState } from 'react'
import PropTypes from 'prop-types'

const NewBlog = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newURL, setNewURL] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = { title: newTitle, author: newAuthor, url: newURL }
    createBlog(newBlog)
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleURLChange = (event) => {
    setNewURL(event.target.value)
  }

  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={addBlog}>
        <div>
          <p>Title: </p>
          <input value={newTitle} onChange={handleTitleChange} />
        </div>
        <div>
          <p>Author: </p>
          <input value={newAuthor} onChange={handleAuthorChange} />
        </div>
        <div>
          <p>URL: </p>
          <input value={newURL} onChange={handleURLChange} />
        </div>
        <br></br>
        <button type="submit">Add</button>
      </form>
      <br></br>
    </div>
  )
}

NewBlog.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default NewBlog
