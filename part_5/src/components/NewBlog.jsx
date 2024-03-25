const NewBlog = (props) => {
  return (
    <div>
      <h3>Add a new blog</h3>
      <form onSubmit={props.addBlog}>
        <div>
          <p>Title: </p>
          <input value={props.newTitle} onChange={props.handleTitleChange} />
        </div>
        <div>
          <p>Author: </p>
          <input value={props.newAuthor} onChange={props.handleAuthorChange} />
        </div>
        <div>
          <p>URL: </p>
          <input value={props.newURL} onChange={props.handleURLChange} />
        </div>
        <br></br>
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default NewBlog;
