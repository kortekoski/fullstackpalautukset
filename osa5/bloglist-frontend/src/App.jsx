import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'
import './index.css'

const Notification = ({notification}) => {
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

const Error = ({errorMessage}) => {
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
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(() => {setErrorMessage(null)}, 5000)
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
          username={username} p
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
        <h3>Create a blog</h3>
        <BlogForm handleBlogForm={handleBlogForm}/>
        <button onClick={handleLogout}>Log out</button>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }
}

export default App