import { useState, useEffect, useRef } from 'react'
import Togglable from './components/Togglable'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  } else {
    return (
      <div className='success'>
        {notification}
      </div>
    )
  }
}

const Error = ({ errorMessage }) => {
  if (errorMessage === null) {
    return null
  } else {
    return (
      <div className='error'>
        {errorMessage}
      </div>
    )
  }
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [blogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Invalid username/password!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    blogService.setToken(null)
  }

  const handleBlogForm = async (title, author, url) => {

    const newBlog = {
      'title': title === '' ? undefined : title,
      'author': author,
      'url': url === '' ? undefined : url
    }

    try {
      await blogService.createBlog(newBlog)

      setNotification(`BLOG ${title} by ${author} ADDED`)
      setTimeout(() => {setNotification(null)}, 5000)

      const newBlogs = await blogService.getAll()
      setBlogs(newBlogs)
      blogFormRef.current.toggleVisibility()
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {setErrorMessage(null)}, 5000)
    }
  }

  const handleLike = async (blog) => {
    const newBlog = { ...blog, likes: blog.likes + 1 }

    const updatedBlog = await blogService.updateBlog(newBlog)

    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  const handleRemoval = async (blog) => {
    if (window.confirm(`Delete ${blog.title} by ${blog.author}?`)){
      blogService.deleteBlog(blog)
    }
  }

  if (user === null){
    return (
      <div>
        <h2>Login</h2>
        <Error errorMessage={errorMessage} />
        <LoginForm
          handleSubmit={handleLogin}
          setUsername={setUsername} setPassword={setPassword}
          username={username}
          password={password}
        />
      </div>
    )
  } else {
    return (
      <div>
        <h2>Blogs</h2>
        <Notification notification={notification} />
        <Error errorMessage={errorMessage} />
        <p>{user.username} logged in</p>
        <Togglable buttonLabel='create blog' ref={blogFormRef}>
          <BlogForm handleBlogForm={handleBlogForm}/>
        </Togglable>
        <button onClick={handleLogout}>Log out</button>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => <Blog key={blog.id} blog={blog} sessionUser={user} handleLike={handleLike} handleRemoval={handleRemoval}/>)
        }
      </div>
    )
  }
}

export default App