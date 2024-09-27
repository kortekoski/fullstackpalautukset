import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('yee')

    try {
      const user = await loginService.login({
        username, password
      })
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log('fug')
      setErrorMessage('Invalid username/password')
      setTimeout(() => {
        setErrorMessage(null), 5000
      })
    }

  }

  const loginForm = () => {
    return (
      <LoginForm 
        handleSubmit={handleLogin} 
        setUsername={setUsername} setPassword={setPassword} 
        username={username} password={password}
      />
    )
  }

  const blogFeed = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <p>{user.username} logged in</p>
        {blogs.map(blog => 
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    )
  }  

  return (
    <div>
      {!user && loginForm()}
      {user && blogFeed()}
    </div>
  )
}

export default App