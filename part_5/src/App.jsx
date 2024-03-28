import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import NewBlog from './components/NewBlog';
import Togglable from './components/Togglable';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const blogFormRef = useRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(sortBlogs(blogs)));
  }, []);

  const sortBlogs = (blogs) => {
    const sortedBlogs = blogs.sort((blog1, blog2) => blog2.likes - blog1.likes);
    return sortedBlogs;
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedUser', JSON.stringify(user));
      setUser(user);
      blogService.setToken(user.token);
      setUsername('');
      setPassword('');
    } catch (exception) {
      setError('Wrong username or password.');
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser');
    setUser(null);
  };

  const handleLike = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        user: blog.user.id,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url,
      });
      setBlogs(
        sortBlogs(blogs.map((b) => (b.id === updatedBlog.id ? updatedBlog : b)))
      );
    } catch (exception) {
      setError(exception.toString());
    }
  };

  const handleDelete = async (id) => {
    try {
      await blogService.remove(id);
      setBlogs(sortBlogs(blogs.filter((b) => b.id !== id)));
      setMessage('Blog deleted.');
    } catch (exception) {
      setError(exception.toString());
    }
  };

  const addBlog = async (newBlog) => {
    blogFormRef.current.toggleVisibility();
    const blog = await blogService.create(newBlog);
    setBlogs(blogs.concat(blog));
    setMessage('New blog created.');
  };

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      Username
      <div>
        <input
          type="text"
          value={username}
          id="username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      Password
      <div>
        <input
          type="password"
          value={password}
          id="password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <br></br>
      <button id="login" type="submit">
        Login
      </button>
    </form>
  );

  return (
    <div>
      <Notification
        message={message}
        error={error}
        setMessage={setMessage}
        setError={setError}
      />
      {!user && loginForm()}
      {user && (
        <div>
          <p>{user.name} logged in.</p>
          <Togglable
            showLabel="Add a new blog"
            hideLabel="Cancel"
            ref={blogFormRef}
          >
            <NewBlog createBlog={addBlog}></NewBlog>
          </Togglable>
          <button onClick={() => handleLogout()}>Logout</button>
        </div>
      )}
      <div>
        <h2>Blogs</h2>
        {blogs.map((blog) =>
          user && user.username === blog.user.username ? (
            <Blog
              key={blog.id}
              blog={blog}
              handleLike={handleLike}
              handleDelete={handleDelete}
            />
          ) : (
            <Blog key={blog.id} blog={blog} handleLike={handleLike} />
          )
        )}
      </div>
    </div>
  );
};

export default App;
