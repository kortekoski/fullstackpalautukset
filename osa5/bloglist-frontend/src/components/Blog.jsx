import { useState } from 'react'
import PropTypes from 'prop-types'


const Blog = ({ blog, sessionUser, handleLike, handleRemoval }) => {

  const blogStyle = {
    padding: 10,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 10
  }

  const getUser = () => {
    if (Object.keys(blog).includes('user')){
      return blog.user.username
    } else {
      return 'user not defined'
    }
  }

  const showDelete = () => {
    if (getUser() === sessionUser.username) {
      return true
    } else {
      return false
    }
  }

  const [showInfo, setShowInfo] = useState(false)
  const username = getUser()

  if (!showInfo) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author}
        <button onClick={() => setShowInfo(true)}>show info</button>
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
        </div>
        <div>
         {blog.url}
        </div>
        <div>
          likes <text data-testid="blog-like">{blog.likes}</text>
           <button onClick={() => handleLike(blog)}>like</button>
        </div>
        <div>
          {username}
        </div>
        <div>
          {showDelete() ? <button onClick={() => handleRemoval(blog)}>delete blog</button> : null}
        </div>
        <button onClick={() => setShowInfo(false)}>hide info</button>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  sessionUser: PropTypes.object.isRequired
}

export default Blog